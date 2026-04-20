---
hidden: true
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
---

# CVU deposits

Un **depósito CVU** es una transferencia en pesos argentinos (ARS) que el pagador origina desde su banco hacia un CVU de la plataforma provisto por Vita. Llegan de forma **asíncrona**: el pagador inicia la transferencia, Vita acredita los fondos en el CVU del comercio, y la plataforma debe decidir a qué cuenta del comercio imputar el depósito.

Esta guía cubre el flujo completo post-refactor: notificación del webhook, distinción entre CVU fijo y dinámico, ventana de expiración de 48 h, camino de review y configuración de mínimos por cliente.

## CVU fijo vs CVU dinámico

Cada `NodeCVU` tiene un campo `Mode` que determina cómo se matchea el depósito con una intención de pago preexistente.

| Característica                   | **CVU fijo** (`Mode=STATIC`)                                                                     | **CVU dinámico** (`Mode=DYNAMIC`)                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Ciclo de vida                    | Código largo del comercio, compartido entre todos los pagadores.                                 | Emitido por Vita para un único intento de pago.                                      |
| Trazabilidad                     | No hay match automático: se crea un `LOCAL_DEPOSIT` huérfano que requiere **asignación manual**. | Match 1:1 con el ATTEMPT: al recibir el webhook, el intento se promueve a `CREATED`. |
| Caso de uso típico               | Depósitos recurrentes, on-boarding con checkout off-platform.                                    | Checkout con monto y originante predeterminados (purchase flow).                     |
| Clasificación UNDERPAID/OVERPAID | Solo al asignar (`expectedAmount` opcional).                                                     | Automática, comparando monto recibido vs monto del ATTEMPT.                          |
| Webhook inicial                  | `purchase.pendingAssignment`.                                                                    | `purchase.attempted` → `purchase.pendingAssignment` si el monto calza.               |

## Flujo end-to-end

Todos los depósitos, fijos o dinámicos, llegan al mismo webhook entrante:

```
POST /payments/webhook/vitawallet
```

> El endpoint anterior `POST /payments/webhook/vita/cvu` fue **eliminado**. Vita notifica tanto órdenes outbound como depósitos CVU a un único endpoint unificado.

```mermaid
flowchart TD
    A[Pagador transfiere al CVU] --> B[Vita notifica el depósito]
    B --> C[POST /payments/webhook/vitawallet]
    C --> D{NodeCVU.Mode?}
    D -- STATIC --> E[Crea LOCAL_DEPOSIT<br/>CREATED, sin accountNumber<br/>expiresAt = +48h]
    D -- DYNAMIC --> F[Promueve ATTEMPT ligado<br/>a CREATED]
    E --> G[purchase.pendingAssignment]
    F --> G
    G --> H{¿Requiere review?}
    H -- sí --> I[REQUIRES_REVIEW<br/>payment.requiresReview]
    H -- no --> J[Operator asigna vía<br/>POST /payments/{id}/assign]
    I --> K{Decisión}
    K -- APPROVED --> J
    K -- REJECTED --> L[Crea child REFUND<br/>parent → FAILED<br/>payment.reviewRejected]
    J --> M[SETTLED<br/>payment.settled]
    E -.48h sin asignación.-> N[Crea child REFUND<br/>parent → EXPIRED<br/>payment.expired]
    F -.48h sin asignación.-> N
    L --> O[Vita confirma refund]
    N --> O
    O --> P[child REFUND SETTLED<br/>payment.refund.settled]
```

## Creación del pago (automática)

Cada notificación de depósito crea un pago con:

* `type = "LOCAL_DEPOSIT"`.
* `status = "CREATED"`, sin `accountNumber` en el caso de CVU fijo.
* `externalId = "vitawallet:<providerReference>"` — clave natural para idempotencia.
* `expiresAt = depositedAt + 48h`.
* Un nodo `Origin` de tipo `CVU` con el CUIT del originante, nombre (cuando está disponible), email y el `customerId` resuelto.

La misma notificación dispara la **resolución de customer**: la plataforma busca un customer por `(clientId, documentNumber)` y crea uno `BASIC` con `autoCreated=true` si no existe. Ver [Customers](../api-reference/customers.md).

## Asignación por operador

Para CVU fijo, la asignación es el paso explícito donde alguien (un humano en tu dashboard o un proceso automático) vincula el depósito pendiente a una cuenta destino. Ver [`POST /payments/{id}/assign`](../api-reference/payments/payments.md#assignment-cvu-deposits).

### Asignación simple (depósito = monto esperado)

```json
POST /payments/$PAYMENT_ID/assign
{
  "accountId": "69b30d599e252a224cfe6bd7"
}
```

El pago transiciona a `SETTLED`. La reconciliación devuelve `PAID`. Tu endpoint recibe `payment.settled`.

### Asignación con diferencia de monto

Cuando el operador asigna contra una factura de monto específico (por ejemplo, se esperaba `10000.00` pero llegaron `7500.00`), pasar `expectedAmount`:

```json
POST /payments/$PAYMENT_ID/assign
{
  "accountId": "69b30d599e252a224cfe6bd7",
  "expectedAmount": "10000.00"
}
```

La plataforma:

1. Clasifica el delta: `UNDERPAID`, `OVERPAID`, o `PAID` dentro de tolerancia.
2. Transiciona el parent a `SETTLED` con `reconciliationStatus` seteado.
3. Crea una **transacción hija companion** con el delta absoluto en `totalAmount` y `relatedPaymentId` apuntando al parent (el link es simétrico).
4. Emite `payment.settled` más `purchase.underpaid` o `purchase.overpaid`.

## Ventana de 48 h y auto-refund

Un depósito que queda sin asignar pasadas las 48 h es barrido por el checker de expiración. El comportamiento cambió respecto del flujo anterior:

1. La plataforma **inicia automáticamente un refund al originante vía Vita**.
2. Se crea una transacción hija `REFUND` en estado `RECEIVED`, con `relatedPaymentId` apuntando al parent.
3. El parent transiciona a `EXPIRED` y queda terminal.
4. Tu endpoint recibe `payment.expired` (parent) y `payment.refund.created` (child).
5. Cuando Vita confirma el refund, la child transiciona a `SETTLED` y se emite `payment.refund.settled`. Si Vita lo rechaza, la child queda `FAILED` y se emite `payment.refund.failed`.

El parent **no vuelve a moverse**: todos los eventos posteriores del refund viajan ruteados a la child.

> Si tu operación necesita una ventana distinta a 48 h, contactá a tu referente de integración para configurarla por cliente.

## Review flow

Cuando el depósito supera el umbral configurado y el customer no está documentado, el pago entra a `REQUIRES_REVIEW` antes de poder asignarse. El flujo completo (documentos, aprobación, rechazo) está en [Review flow](review-flow.md).

Un rechazo en review (`POST /payments/{id}/resolve-review` con `decision=REJECTED`) sobre un depósito CVU pendiente **también dispara un refund automático**: se crea la child REFUND en `RECEIVED`, el parent pasa a `FAILED`, y se emite `payment.reviewRejected` (con fallback a `payment.failed`) para el parent más `payment.refund.created` para la child.

## Monto mínimo por cliente y moneda

El setting `MinCvuDepositByCurrency` del merchant controla el monto mínimo aceptable por moneda:

```json
{
  "MinCvuDepositByCurrency": {
    "ARS": "1000.00"
  }
}
```

Un depósito por debajo del mínimo configurado es **rechazado con `412 FailedPrecondition`** en el webhook; **no se crea ninguna transacción** ni se emiten webhooks al integrador. El dinero queda pendiente de reconciliación manual con Vita.

Si la moneda no está presente en el mapa, no se aplica mínimo y cualquier monto es aceptado.

## Vistas de dashboard

Tu dashboard típicamente necesita tres paneles. Todos están scoped por tenant y reciben `clientId` como query parameter.

1. **Widget de saldo no asignado** — [`GET /accounts/unassigned`](../api-reference/balances.md) → total en escrow + pequeña lista de depósitos próximos a expirar.
2. **Lista completa de pendientes** — [`GET /payments/unassigned`](../api-reference/balances.md) → lista paginada con monto, originante y `expiresAt`.
3. **Panel de customer** — [`GET /payments/{id}/customer`](../api-reference/payments/payments.md#customer-link) sobre un depósito seleccionado → registro persistente del customer ligado al originante, listo para editar `operationLevel` o subir documentos.

## Webhooks emitidos

| Reason interno      | Evento emitido al integrador                         | Disparador                                                                     |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `attempted`         | `purchase.attempted`                                 | Se crea un ATTEMPT (CVU dinámico).                                             |
| `pendingAssignment` | `purchase.pendingAssignment`                         | Depósito en `CREATED` esperando asignación por operador.                       |
| `requiresReview`    | `payment.requiresReview`                             | El pago entra a `REQUIRES_REVIEW` (umbral + customer no documentado).          |
| `reviewApproved`    | `payment.reviewApproved`                             | Operador aprueba con `decision=APPROVED`.                                      |
| `reviewRejected`    | `payment.reviewRejected` (fallback `payment.failed`) | Operador rechaza con `decision=REJECTED`; se crea child REFUND.                |
| `underpaid`         | `purchase.underpaid`                                 | Asignado con `expectedAmount > received`.                                      |
| `overpaid`          | `purchase.overpaid`                                  | Asignado con `expectedAmount < received`.                                      |
| `expired`           | `payment.expired`                                    | Pasaron 48 h sin asignación; se crea child REFUND y el parent queda `EXPIRED`. |
| `refundCreated`     | `payment.refund.created`                             | Se crea la transacción hija REFUND (ruteado a la child).                       |
| `refundSettled`     | `payment.refund.settled`                             | Vita confirma el refund (ruteado a la child; el parent sigue terminal).        |
| `refundFailed`      | `payment.refund.failed`                              | Vita rechaza el refund (ruteado a la child).                                   |
| `settled`           | `payment.settled`                                    | Depósito asignado y reconciliado.                                              |
| `failed`            | `payment.failed`                                     | Fallo terminal del pago.                                                       |

## Endpoints relacionados

| Método | Ruta                            | Descripción                                                   |
| ------ | ------------------------------- | ------------------------------------------------------------- |
| POST   | `/payments/webhook/vitawallet`  | Webhook entrante unificado de Vita (órdenes + depósitos CVU). |
| POST   | `/payments/{id}/assign`         | Asignar depósito pendiente a una cuenta destino.              |
| POST   | `/payments/{id}/request-review` | Forzar el pago a `REQUIRES_REVIEW`.                           |
| POST   | `/payments/{id}/resolve-review` | Resolver review (`APPROVED` / `REJECTED`).                    |
| POST   | `/payments/{id}/mark-unsettled` | Marcar el depósito como no reconciliable después del recibo.  |
| GET    | `/payments/unassigned`          | Listado paginado de depósitos pendientes de asignación.       |
| GET    | `/accounts/unassigned`          | Saldo total en escrow + depósitos próximos a expirar.         |
| GET    | `/payments/{id}/customer`       | Customer persistente ligado al originante del depósito.       |
