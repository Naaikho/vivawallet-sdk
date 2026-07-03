import { createHmac } from 'crypto';
import { describe, expect, it } from 'vitest';
import {
  buildVivaIsvWebhookVerificationBody,
  buildVivaIsvWebhookVerificationResponse,
  buildVivaMerchantWebhookVerificationBody,
  buildVivaMerchantWebhookVerificationResponse,
  extractVivaWebhookIdentity,
  getVivaWebhookIdempotencyKey,
  validateVivaAccountConnectionWebhook,
  validateVivaAccountTransactionWebhook,
  validateVivaBankTransferCommandWebhook,
  validateVivaObligationWebhook,
  validateVivaOrderUpdatedWebhook,
  validateVivaPaymentResultWebhook,
  validateVivaPosSessionWebhook,
  validateVivaTransactionFailedWebhook,
  validateVivaTransactionPaymentCreatedWebhook,
  validateVivaTransactionPriceCalculatedWebhook,
  validateVivaTransactionReversalCreatedWebhook,
  validateVivaTransferCreatedWebhook,
  verifyVivaDataServicesWebhookSignature,
} from '../../src/utils/webhooks';
import {
  createWebhookIssue,
  getWebhookEnvelope,
  getWebhookEventData,
  isMissingWebhookValue,
  isWebhookRecord,
  readWebhookHeader,
  readWebhookNumberHeader,
  validateWebhookFields,
  webhookValuesMatch,
} from '../../src/utils/webhooks/internal';

function digest(
  rawBody: string | Buffer | Uint8Array,
  secret: string,
  algorithm: 'sha1' | 'sha256'
): string {
  return createHmac(algorithm, secret).update(rawBody).digest('hex');
}

describe('webhook internal helpers', () => {
  it('detects webhook records and extracts event data', () => {
    expect(isWebhookRecord({ a: 1 })).toBe(true);
    expect(isWebhookRecord(null)).toBe(false);
    expect(isWebhookRecord([])).toBe(false);
    expect(getWebhookEventData({ EventData: { OrderCode: 1 } })).toEqual({
      OrderCode: 1,
    });
    expect(getWebhookEventData({ OrderCode: 1 })).toEqual({ OrderCode: 1 });
    expect(getWebhookEventData(null)).toBeNull();
    expect(getWebhookEnvelope({ MessageId: 'msg' })).toEqual({
      MessageId: 'msg',
    });
    expect(getWebhookEnvelope(null)).toBeNull();
  });

  it('creates issues and reads header values', () => {
    expect(
      createWebhookIssue('field', 'missing', 'message', 'x', undefined)
    ).toMatchObject({
      field: 'field',
      code: 'missing',
      message: 'message',
      expected: 'x',
    });

    expect(readWebhookHeader(undefined, 'Header')).toBeUndefined();
    expect(readWebhookHeader({ Header: ['a', 'b'] }, 'Header')).toBe('a');
    expect(readWebhookHeader({ Header: 12 }, 'Header')).toBe('12');
    expect(readWebhookHeader({ header: 'lower' }, 'Header')).toBe('lower');
    expect(readWebhookHeader({ header: ['lower'] }, 'Header')).toBe('lower');
    expect(readWebhookHeader({ Header: null }, 'Header')).toBeUndefined();
    expect(readWebhookHeader({ Other: 'x' }, 'Header')).toBeUndefined();
  });

  it('reads number headers and validates field checks', () => {
    expect(readWebhookNumberHeader({ RetryCount: '2' }, 'RetryCount')).toBe(2);
    expect(
      readWebhookNumberHeader({ RetryCount: '' }, 'RetryCount')
    ).toBeNull();
    expect(
      readWebhookNumberHeader({ RetryCount: 'null' }, 'RetryCount')
    ).toBeNull();
    expect(
      readWebhookNumberHeader({ RetryCount: 'invalid' }, 'RetryCount')
    ).toBeUndefined();
    expect(readWebhookNumberHeader({}, 'RetryCount')).toBeUndefined();

    expect(isMissingWebhookValue(undefined)).toBe(true);
    expect(isMissingWebhookValue(null)).toBe(true);
    expect(isMissingWebhookValue('')).toBe(true);
    expect(isMissingWebhookValue(0)).toBe(false);
    expect(webhookValuesMatch(1, 1)).toBe(true);
    expect(webhookValuesMatch(true, true)).toBe(true);
    expect(webhookValuesMatch('1', 1)).toBe(true);
    expect(webhookValuesMatch('1', 2)).toBe(false);

    expect(
      validateWebhookFields([
        { field: 'A', actual: undefined, required: true },
        { field: 'B', actual: undefined, expected: 'b' },
        { field: 'C', actual: 'x', expected: 'c' },
        { field: 'D', actual: 'd' },
      ]).map((issue) => issue.code)
    ).toEqual(['missing', 'missing', 'mismatch']);
  });
});

describe('webhook verification helpers', () => {
  it('builds merchant and ISV verification bodies and responses', () => {
    expect(buildVivaMerchantWebhookVerificationBody('key')).toEqual({
      Key: 'key',
    });
    expect(buildVivaIsvWebhookVerificationBody('key')).toEqual({ key: 'key' });
    expect(buildVivaMerchantWebhookVerificationResponse('key')).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { Key: 'key' },
    });
    expect(buildVivaIsvWebhookVerificationResponse('key')).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { key: 'key' },
    });
  });
});

describe('webhook signature verification', () => {
  it('verifies SHA-256 signatures from raw request bodies', () => {
    const rawBody = JSON.stringify({ ok: true });
    const secret = 'secret';
    const signature = digest(rawBody, secret, 'sha256');

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody,
        secret,
        headers: {
          'Viva-Signature-256': signature,
          'Viva-Delivery-Id': 'delivery',
          'Viva-Event': 'event',
        },
      })
    ).toMatchObject({
      valid: true,
      algorithm: 'sha256',
      signature,
      deliveryId: 'delivery',
      event: 'event',
      issues: [],
    });
  });

  it('does not downgrade to SHA-1 when SHA-256 is present but invalid', () => {
    const rawBody = JSON.stringify({ ok: true });
    const secret = 'secret';
    const sha1 = digest(rawBody, secret, 'sha1');
    const result = verifyVivaDataServicesWebhookSignature({
      rawBody,
      secret,
      headers: {
        'Viva-Signature-256': '00',
        'Viva-Signature': sha1,
      },
    });

    expect(result.valid).toBe(false);
    expect(result.algorithm).toBe('sha256');
    expect(result.issues).toHaveLength(1);
    expect('expectedSignature' in result).toBe(false);
  });

  it('supports SHA-1 when no SHA-256 header is present or when explicitly requested', () => {
    const rawBody = Buffer.from(JSON.stringify({ ok: true }));
    const secret = 'secret';
    const signature = digest(rawBody, secret, 'sha1');

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody,
        secret,
        headers: { 'Viva-Signature': signature },
      })
    ).toMatchObject({ valid: true, algorithm: 'sha1' });

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: new Uint8Array(rawBody),
        secret,
        algorithm: 'sha1',
        headers: { 'Viva-Signature': signature },
      })
    ).toMatchObject({ valid: true, algorithm: 'sha1' });
  });

  it('returns structured failures for missing inputs and mismatches', () => {
    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: null,
        secret: null,
        headers: {},
      })
    ).toMatchObject({
      valid: false,
      algorithm: null,
    });

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: null,
        secret: 'secret',
        algorithm: 'sha256',
        headers: { 'Viva-Signature-256': 'signature' },
      })
    ).toMatchObject({
      valid: false,
      algorithm: 'sha256',
      signature: 'signature',
    });

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: 'body',
        secret: null,
        algorithm: 'sha256',
        headers: { 'Viva-Signature-256': 'signature' },
      })
    ).toMatchObject({
      valid: false,
      algorithm: 'sha256',
      signature: 'signature',
    });

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: 'body',
        secret: 'secret',
        algorithm: 'sha256',
        headers: {},
      })
    ).toMatchObject({
      valid: false,
      algorithm: 'sha256',
    });

    expect(
      verifyVivaDataServicesWebhookSignature({
        rawBody: 'body',
        secret: 'secret',
        headers: { 'Viva-Signature-256': 'not-hex' },
      }).issues[0].code
    ).toBe('mismatch');
  });
});

describe('webhook identity and idempotency', () => {
  it('extracts envelope and header identity fields', () => {
    expect(
      extractVivaWebhookIdentity(
        {
          EventTypeId: 1,
          MessageId: 'msg',
          CorrelationId: 'corr',
          Created: '2026-01-01T00:00:00Z',
          RetryCount: 2,
          RetryDelayInSeconds: 10,
          RecipientId: 'recipient',
          MessageTypeId: 3,
        },
        {
          'Viva-Delivery-Id': 'delivery',
          'Viva-Event': 'event',
        }
      )
    ).toEqual({
      eventTypeId: 1,
      messageId: 'msg',
      correlationId: 'corr',
      created: '2026-01-01T00:00:00Z',
      retryCount: 2,
      retryDelayInSeconds: 10,
      recipientId: 'recipient',
      messageTypeId: 3,
      deliveryId: 'delivery',
      event: 'event',
    });
  });

  it('falls back to retry headers and selects stable idempotency keys by priority', () => {
    expect(
      extractVivaWebhookIdentity(null, {
        RetryCount: '1',
        RetryDelayInSeconds: '5',
      })
    ).toMatchObject({ retryCount: 1, retryDelayInSeconds: 5 });

    expect(getVivaWebhookIdempotencyKey({ MessageId: 'msg' })).toMatchObject({
      success: true,
      key: 'msg',
      field: 'MessageId',
      source: 'envelope',
    });
    expect(
      getVivaWebhookIdempotencyKey({}, { 'Viva-Delivery-Id': 'delivery' })
    ).toMatchObject({
      key: 'delivery',
      source: 'headers',
    });
    expect(
      getVivaWebhookIdempotencyKey({ EventData: { TransactionId: 'tx' } })
    ).toMatchObject({
      key: 'tx',
      field: 'TransactionId',
      source: 'eventData',
    });
    expect(getVivaWebhookIdempotencyKey({})).toMatchObject({
      success: false,
      key: null,
      field: null,
      source: null,
    });
    expect(getVivaWebhookIdempotencyKey(null)).toMatchObject({
      success: false,
      key: null,
      field: null,
      source: null,
    });
  });

  it('uses all supported event-data idempotency fallbacks', () => {
    const fields = [
      'OrderCode',
      'TransferId',
      'ObligationId',
      'CaptureId',
      'ConnectedAccountId',
      'PersonId',
      'SessionId',
      'CommandId',
      'BankTransferId',
    ];

    for (const field of fields) {
      expect(
        getVivaWebhookIdempotencyKey({ EventData: { [field]: field } })
      ).toMatchObject({
        key: field,
        field,
        source: 'eventData',
      });
    }
  });
});

describe('webhook soft validation', () => {
  const paymentData = {
    OrderCode: 123,
    TransactionId: 'tx',
    StatusId: 'F',
    Amount: 100,
    CurrencyCode: '978',
  };

  it('validates payment-result payloads and wrappers', () => {
    expect(
      validateVivaPaymentResultWebhook(
        { EventData: paymentData },
        {
          expectedOrderCode: 123,
          expectedTransactionId: 'tx',
          expectedStatusId: 'F',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
        }
      )
    ).toMatchObject({ valid: true, issues: [] });

    expect(validateVivaPaymentResultWebhook({ EventData: {} })).toMatchObject({
      valid: false,
    });
    expect(
      validateVivaPaymentResultWebhook(
        { EventData: paymentData },
        { expectedOrderCode: 999 }
      ).issues[0].code
    ).toBe('mismatch');
    expect(
      validateVivaTransactionPaymentCreatedWebhook({ EventData: paymentData })
        .valid
    ).toBe(true);
    expect(
      validateVivaTransactionReversalCreatedWebhook({ EventData: paymentData })
        .valid
    ).toBe(true);
  });

  it('validates failed transaction response event ids', () => {
    expect(
      validateVivaTransactionFailedWebhook({
        EventData: { ...paymentData, ResponseEventId: 0 },
      })
    ).toMatchObject({ valid: true });

    const missing = validateVivaTransactionFailedWebhook({
      EventData: paymentData,
    });
    expect(missing.valid).toBe(false);
    expect(
      missing.issues.some((issue) => issue.field === 'ResponseEventId')
    ).toBe(true);
  });

  it('validates order updates', () => {
    expect(
      validateVivaOrderUpdatedWebhook(
        { EventData: { OrderCode: 123, IsCancelled: false } },
        { expectedOrderCode: 123, expectedIsCancelled: false }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaOrderUpdatedWebhook({ EventData: {} }).valid).toBe(
      false
    );
  });

  it('validates account connection payloads', () => {
    expect(
      validateVivaAccountConnectionWebhook(
        {
          EventData: {
            ConnectedAccountId: 'account',
            PersonId: 'person',
            PlatformPersonId: 'platform',
            WalletId: 1,
            Verified: true,
          },
        },
        {
          expectedConnectedAccountId: 'account',
          expectedPersonId: 'person',
          expectedPlatformPersonId: 'platform',
          expectedWalletId: 1,
          expectedVerified: true,
        }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaAccountConnectionWebhook({ EventData: {} }).valid).toBe(
      false
    );
  });

  it('validates transfer and obligation payloads', () => {
    expect(
      validateVivaTransferCreatedWebhook(
        {
          EventData: {
            TransferId: 'transfer',
            TransactionId: 'tx',
            Amount: 100,
            CurrencyCode: '978',
            TargetWalletId: 1,
            TargetPersonId: 'person',
            TransferTypeId: 2,
          },
        },
        {
          expectedTransferId: 'transfer',
          expectedTransactionId: 'tx',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
          expectedTargetWalletId: 1,
          expectedTargetPersonId: 'person',
          expectedTransferTypeId: 2,
        }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaTransferCreatedWebhook({ EventData: {} }).valid).toBe(
      false
    );

    expect(
      validateVivaObligationWebhook(
        {
          EventData: {
            ObligationId: 'obligation',
            CaptureId: 'capture',
            Amount: 100,
            CurrencyCode: '978',
            TargetWalletId: 1,
            TargetPersonId: 'person',
          },
        },
        {
          expectedObligationId: 'obligation',
          expectedCaptureId: 'capture',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
          expectedTargetWalletId: 1,
          expectedTargetPersonId: 'person',
        }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaObligationWebhook({ EventData: {} }).valid).toBe(false);
  });

  it('validates POS, price calculated, account transaction and bank transfer payloads', () => {
    expect(
      validateVivaPosSessionWebhook(
        {
          EventData: {
            SessionId: 'session',
            TransactionId: 'tx',
            StatusId: 'F',
            Amount: 100,
            CurrencyCode: '978',
          },
        },
        {
          expectedSessionId: 'session',
          expectedTransactionId: 'tx',
          expectedStatusId: 'F',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
        }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaPosSessionWebhook({ EventData: {} }).valid).toBe(false);
    expect(validateVivaPosSessionWebhook(null)).toMatchObject({
      valid: false,
      data: null,
    });

    expect(
      validateVivaTransactionPriceCalculatedWebhook(
        {
          EventData: {
            TransactionId: 'tx',
            OrderCode: 123,
            Amount: 100,
            CurrencyCode: '978',
          },
        },
        {
          expectedTransactionId: 'tx',
          expectedOrderCode: 123,
          expectedAmount: 100,
          expectedCurrencyCode: '978',
        }
      )
    ).toMatchObject({ valid: true });

    expect(
      validateVivaAccountTransactionWebhook(
        {
          EventData: {
            TransactionId: 'tx',
            Amount: 100,
            CurrencyCode: '978',
            WalletId: 1,
            AccountId: 'account',
          },
        },
        {
          expectedTransactionId: 'tx',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
          expectedWalletId: 1,
          expectedAccountId: 'account',
        }
      )
    ).toMatchObject({ valid: true });
    expect(validateVivaAccountTransactionWebhook({ EventData: {} }).valid).toBe(
      false
    );

    expect(
      validateVivaBankTransferCommandWebhook(
        {
          EventData: {
            CommandId: 'command',
            BankTransferId: 'bank-transfer',
            TransactionId: 'tx',
            Amount: 100,
            CurrencyCode: '978',
            WalletId: 1,
          },
        },
        {
          expectedCommandId: 'command',
          expectedBankTransferId: 'bank-transfer',
          expectedTransactionId: 'tx',
          expectedAmount: 100,
          expectedCurrencyCode: '978',
          expectedWalletId: 1,
        }
      )
    ).toMatchObject({ valid: true });
    expect(
      validateVivaBankTransferCommandWebhook({ EventData: {} }).valid
    ).toBe(false);
  });

  it('returns invalid results when payloads are not objects', () => {
    expect(validateVivaPaymentResultWebhook(null)).toMatchObject({
      valid: false,
      data: null,
    });
  });
});
