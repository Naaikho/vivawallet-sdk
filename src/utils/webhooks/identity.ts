import {
  VivaWebhookHeaders,
  VivaWebhookIdentity,
  VivaWebhookIdempotencyKeyResult,
} from '../../types/VivaWebHook.types';
import {
  createWebhookIssue,
  getWebhookEnvelope,
  getWebhookEventData,
  isMissingWebhookValue,
  isWebhookRecord,
  readWebhookHeader,
  readWebhookNumberHeader,
} from './internal';

function readEventDataField(payload: unknown, field: string): unknown {
  const eventData = getWebhookEventData(payload);
  if (!isWebhookRecord(eventData)) return undefined;
  return eventData[field];
}

function selectKey(
  key: unknown,
  field: string,
  source: VivaWebhookIdempotencyKeyResult['source']
): VivaWebhookIdempotencyKeyResult | null {
  if (isMissingWebhookValue(key)) return null;

  return {
    success: true,
    key: String(key),
    field,
    source,
    warnings: [],
  };
}

/** Extract envelope and Data Services header identity fields from a Viva webhook notification. */
export function extractVivaWebhookIdentity(
  payload: unknown,
  headers: VivaWebhookHeaders = {}
): VivaWebhookIdentity {
  const envelope = getWebhookEnvelope(payload);

  return {
    eventTypeId: envelope?.EventTypeId,
    messageId: envelope?.MessageId,
    correlationId: envelope?.CorrelationId,
    created: envelope?.Created,
    retryCount:
      envelope?.RetryCount ?? readWebhookNumberHeader(headers, 'RetryCount'),
    retryDelayInSeconds:
      envelope?.RetryDelayInSeconds ??
      readWebhookNumberHeader(headers, 'RetryDelayInSeconds'),
    recipientId: envelope?.RecipientId,
    messageTypeId: envelope?.MessageTypeId,
    deliveryId: readWebhookHeader(headers, 'Viva-Delivery-Id'),
    event: readWebhookHeader(headers, 'Viva-Event'),
  };
}

/** Build a stable idempotency key from Viva envelope, Data Services headers or event payload identifiers. */
export function getVivaWebhookIdempotencyKey(
  payload: unknown,
  headers: VivaWebhookHeaders = {}
): VivaWebhookIdempotencyKeyResult {
  const envelope = getWebhookEnvelope(payload);
  const deliveryId = readWebhookHeader(headers, 'Viva-Delivery-Id');

  const candidates: Array<
    [unknown, string, VivaWebhookIdempotencyKeyResult['source']]
  > = [
    [envelope?.MessageId, 'MessageId', 'envelope'],
    [deliveryId, 'Viva-Delivery-Id', 'headers'],
    [
      readEventDataField(payload, 'TransactionId'),
      'TransactionId',
      'eventData',
    ],
    [readEventDataField(payload, 'OrderCode'), 'OrderCode', 'eventData'],
    [readEventDataField(payload, 'TransferId'), 'TransferId', 'eventData'],
    [readEventDataField(payload, 'ObligationId'), 'ObligationId', 'eventData'],
    [readEventDataField(payload, 'CaptureId'), 'CaptureId', 'eventData'],
    [
      readEventDataField(payload, 'ConnectedAccountId'),
      'ConnectedAccountId',
      'eventData',
    ],
    [readEventDataField(payload, 'PersonId'), 'PersonId', 'eventData'],
    [readEventDataField(payload, 'SessionId'), 'SessionId', 'eventData'],
    [readEventDataField(payload, 'CommandId'), 'CommandId', 'eventData'],
    [
      readEventDataField(payload, 'BankTransferId'),
      'BankTransferId',
      'eventData',
    ],
  ];

  for (const [key, field, source] of candidates) {
    const selected = selectKey(key, field, source);
    if (selected) return selected;
  }

  return {
    success: false,
    key: null,
    field: null,
    source: null,
    warnings: [
      createWebhookIssue(
        'idempotencyKey',
        'missing',
        'No stable Viva webhook idempotency key could be extracted'
      ),
    ],
  };
}
