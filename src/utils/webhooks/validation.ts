import {
  VivaAccountConnectedWebhookEventData,
  VivaAccountTransactionCreatedWebhookEventData,
  VivaAccountVerificationStatusChangedWebhookEventData,
  VivaBankTransferCommandWebhookEventData,
  VivaObligationWebhookEventData,
  VivaOrderUpdatedWebhookEventData,
  VivaPaymentResultWebhookEventData,
  VivaPosEcrSessionWebhookEventData,
  VivaTransactionPriceCalculatedWebhookEventData,
  VivaTransferCreatedWebhookEventData,
  VivaWebhookFieldExpectations,
  VivaWebhookSoftValidationResult,
} from '../../types/VivaWebHook.types';
import {
  createWebhookIssue,
  getWebhookEventData,
  isMissingWebhookValue,
  validateWebhookFields,
  WebhookFieldCheck,
} from './internal';

function buildResult<EventData>(
  payload: unknown,
  checks: WebhookFieldCheck[]
): VivaWebhookSoftValidationResult<EventData> {
  const data = getWebhookEventData<EventData>(payload);

  if (!data) {
    return {
      valid: false,
      data: null,
      issues: [
        createWebhookIssue(
          'EventData',
          'invalid',
          'Webhook payload must be an object or contain an EventData object'
        ),
      ],
      warnings: [],
    };
  }

  const issues = validateWebhookFields(checks);

  return {
    valid: issues.length === 0,
    data,
    issues,
    warnings: [],
  };
}

function requireAtLeastOneField<EventData>(
  result: VivaWebhookSoftValidationResult<EventData>,
  fields: string[]
): VivaWebhookSoftValidationResult<EventData> {
  if (!result.data) return result;

  const record = result.data as Record<string, unknown>;
  const hasKnownField = fields.some(
    (field) => !isMissingWebhookValue(record[field])
  );

  if (hasKnownField) return result;

  result.issues.push(
    createWebhookIssue(
      fields.join('|'),
      'missing',
      `${fields.join(' or ')} is missing from the webhook payload`
    )
  );
  result.valid = false;
  return result;
}

/** Soft validation for payment-result webhooks. This does not replace an optional Retrieve Transaction confirmation. */
export function validateVivaPaymentResultWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaPaymentResultWebhookEventData> {
  const data = getWebhookEventData<VivaPaymentResultWebhookEventData>(payload);

  return buildResult<VivaPaymentResultWebhookEventData>(payload, [
    {
      field: 'OrderCode',
      actual: data?.OrderCode,
      expected: expectations.expectedOrderCode,
      required: true,
    },
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
      required: true,
    },
    {
      field: 'StatusId',
      actual: data?.StatusId,
      expected: expectations.expectedStatusId,
      required: true,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
      required: true,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
  ]);
}

export function validateVivaTransactionPaymentCreatedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaPaymentResultWebhookEventData> {
  return validateVivaPaymentResultWebhook(payload, expectations);
}

export function validateVivaTransactionFailedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaPaymentResultWebhookEventData> {
  const data = getWebhookEventData<VivaPaymentResultWebhookEventData>(payload);
  const result = validateVivaPaymentResultWebhook(payload, expectations);

  if (result.data && isMissingWebhookValue(data?.ResponseEventId)) {
    result.issues.push(
      createWebhookIssue(
        'ResponseEventId',
        'missing',
        'ResponseEventId is missing from the failed transaction webhook payload'
      )
    );
    result.valid = false;
  }

  return result;
}

export function validateVivaTransactionReversalCreatedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaPaymentResultWebhookEventData> {
  return validateVivaPaymentResultWebhook(payload, expectations);
}

export function validateVivaOrderUpdatedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaOrderUpdatedWebhookEventData> {
  const data = getWebhookEventData<VivaOrderUpdatedWebhookEventData>(payload);

  return buildResult<VivaOrderUpdatedWebhookEventData>(payload, [
    {
      field: 'OrderCode',
      actual: data?.OrderCode,
      expected: expectations.expectedOrderCode,
      required: true,
    },
    {
      field: 'IsCancelled',
      actual: data?.IsCancelled,
      expected: expectations.expectedIsCancelled,
      required: true,
    },
  ]);
}

export function validateVivaAccountConnectionWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<
  | VivaAccountConnectedWebhookEventData
  | VivaAccountVerificationStatusChangedWebhookEventData
> {
  const data = getWebhookEventData<
    | VivaAccountConnectedWebhookEventData
    | VivaAccountVerificationStatusChangedWebhookEventData
  >(payload);

  return buildResult(payload, [
    {
      field: 'ConnectedAccountId',
      actual: data?.ConnectedAccountId,
      expected: expectations.expectedConnectedAccountId,
      required: true,
    },
    {
      field: 'PersonId',
      actual: data?.PersonId,
      expected: expectations.expectedPersonId,
    },
    {
      field: 'PlatformPersonId',
      actual: data?.PlatformPersonId,
      expected: expectations.expectedPlatformPersonId,
    },
    {
      field: 'WalletId',
      actual: data?.WalletId,
      expected: expectations.expectedWalletId,
    },
    {
      field: 'Verified',
      actual: data && 'Verified' in data ? data.Verified : undefined,
      expected: expectations.expectedVerified,
    },
  ]);
}

export function validateVivaTransferCreatedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaTransferCreatedWebhookEventData> {
  const data =
    getWebhookEventData<VivaTransferCreatedWebhookEventData>(payload);

  return buildResult<VivaTransferCreatedWebhookEventData>(payload, [
    {
      field: 'TransferId',
      actual: data?.TransferId,
      expected: expectations.expectedTransferId,
      required: true,
    },
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
    {
      field: 'TargetWalletId',
      actual: data?.TargetWalletId,
      expected: expectations.expectedTargetWalletId,
    },
    {
      field: 'TargetPersonId',
      actual: data?.TargetPersonId,
      expected: expectations.expectedTargetPersonId,
    },
    {
      field: 'TransferTypeId',
      actual: data?.TransferTypeId,
      expected: expectations.expectedTransferTypeId,
    },
  ]);
}

/** Soft validation for deprecated obligation webhook payloads. */
export function validateVivaObligationWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaObligationWebhookEventData> {
  const data = getWebhookEventData<VivaObligationWebhookEventData>(payload);

  return buildResult<VivaObligationWebhookEventData>(payload, [
    {
      field: 'ObligationId',
      actual: data?.ObligationId,
      expected: expectations.expectedObligationId,
      required: true,
    },
    {
      field: 'CaptureId',
      actual: data?.CaptureId,
      expected: expectations.expectedCaptureId,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
    {
      field: 'TargetWalletId',
      actual: data?.TargetWalletId,
      expected: expectations.expectedTargetWalletId,
    },
    {
      field: 'TargetPersonId',
      actual: data?.TargetPersonId,
      expected: expectations.expectedTargetPersonId,
    },
  ]);
}

export function validateVivaPosSessionWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaPosEcrSessionWebhookEventData> {
  const data = getWebhookEventData<VivaPosEcrSessionWebhookEventData>(payload);

  const result = buildResult<VivaPosEcrSessionWebhookEventData>(payload, [
    {
      field: 'SessionId',
      actual: data?.SessionId,
      expected: expectations.expectedSessionId,
    },
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
    },
    {
      field: 'StatusId',
      actual: data?.StatusId,
      expected: expectations.expectedStatusId,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
  ]);

  return requireAtLeastOneField(result, ['SessionId', 'TransactionId']);
}

export function validateVivaTransactionPriceCalculatedWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaTransactionPriceCalculatedWebhookEventData> {
  const data =
    getWebhookEventData<VivaTransactionPriceCalculatedWebhookEventData>(
      payload
    );

  return buildResult<VivaTransactionPriceCalculatedWebhookEventData>(payload, [
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
    },
    {
      field: 'OrderCode',
      actual: data?.OrderCode,
      expected: expectations.expectedOrderCode,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
  ]);
}

export function validateVivaAccountTransactionWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaAccountTransactionCreatedWebhookEventData> {
  const data =
    getWebhookEventData<VivaAccountTransactionCreatedWebhookEventData>(payload);

  return buildResult<VivaAccountTransactionCreatedWebhookEventData>(payload, [
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
      required: true,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
    {
      field: 'WalletId',
      actual: data?.WalletId,
      expected: expectations.expectedWalletId,
    },
    {
      field: 'AccountId',
      actual: data?.AccountId,
      expected: expectations.expectedAccountId,
    },
  ]);
}

export function validateVivaBankTransferCommandWebhook(
  payload: unknown,
  expectations: VivaWebhookFieldExpectations = {}
): VivaWebhookSoftValidationResult<VivaBankTransferCommandWebhookEventData> {
  const data =
    getWebhookEventData<VivaBankTransferCommandWebhookEventData>(payload);

  const result = buildResult<VivaBankTransferCommandWebhookEventData>(payload, [
    {
      field: 'CommandId',
      actual: data?.CommandId,
      expected: expectations.expectedCommandId,
    },
    {
      field: 'BankTransferId',
      actual: data?.BankTransferId,
      expected: expectations.expectedBankTransferId,
    },
    {
      field: 'TransactionId',
      actual: data?.TransactionId,
      expected: expectations.expectedTransactionId,
    },
    {
      field: 'Amount',
      actual: data?.Amount,
      expected: expectations.expectedAmount,
    },
    {
      field: 'CurrencyCode',
      actual: data?.CurrencyCode,
      expected: expectations.expectedCurrencyCode,
    },
    {
      field: 'WalletId',
      actual: data?.WalletId,
      expected: expectations.expectedWalletId,
    },
  ]);

  return requireAtLeastOneField(result, [
    'CommandId',
    'BankTransferId',
    'TransactionId',
  ]);
}
