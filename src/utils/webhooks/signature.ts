import { createHmac, timingSafeEqual } from 'crypto';
import {
  VivaWebhookSignatureVerificationOptions,
  VivaWebhookSignatureVerificationResult,
  VivaWebhookSoftValidationIssue,
} from '../../types/VivaWebHook.types';
import { createWebhookIssue, readWebhookHeader } from './internal';

function toBodyBuffer(
  rawBody: NonNullable<VivaWebhookSignatureVerificationOptions['rawBody']>
): Buffer {
  if (Buffer.isBuffer(rawBody)) return rawBody;
  if (rawBody instanceof Uint8Array) return Buffer.from(rawBody);
  return Buffer.from(rawBody, 'utf8');
}

function createDigest(
  rawBody: NonNullable<VivaWebhookSignatureVerificationOptions['rawBody']>,
  secret: string,
  algorithm: 'sha1' | 'sha256'
): string {
  return createHmac(algorithm, secret)
    .update(toBodyBuffer(rawBody))
    .digest('hex');
}

function signaturesMatch(actual: string, expected: string): boolean {
  const actualBuffer = Buffer.from(actual, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

function verifyWithAlgorithm(
  options: VivaWebhookSignatureVerificationOptions,
  algorithm: 'sha1' | 'sha256'
): VivaWebhookSignatureVerificationResult {
  const headerName =
    algorithm === 'sha256' ? 'Viva-Signature-256' : 'Viva-Signature';
  const signature = readWebhookHeader(options.headers, headerName);
  const deliveryId = readWebhookHeader(options.headers, 'Viva-Delivery-Id');
  const event = readWebhookHeader(options.headers, 'Viva-Event');

  if (!options.rawBody) {
    return {
      valid: false,
      algorithm,
      issues: [
        createWebhookIssue(
          'rawBody',
          'missing',
          'Raw request body is required to verify a Viva webhook signature'
        ),
      ],
      signature,
      deliveryId,
      event,
    };
  }

  if (!options.secret) {
    return {
      valid: false,
      algorithm,
      issues: [
        createWebhookIssue(
          'secret',
          'missing',
          'Webhook secret is required to verify a Viva webhook signature'
        ),
      ],
      signature,
      deliveryId,
      event,
    };
  }

  if (!signature) {
    return {
      valid: false,
      algorithm,
      issues: [
        createWebhookIssue(
          headerName,
          'missing',
          `${headerName} header is required to verify the webhook signature`
        ),
      ],
      deliveryId,
      event,
    };
  }

  const expectedSignature = createDigest(
    options.rawBody,
    options.secret,
    algorithm
  );
  const valid = signaturesMatch(signature, expectedSignature);

  return {
    valid,
    algorithm,
    issues: valid
      ? []
      : [
          createWebhookIssue(
            headerName,
            'mismatch',
            `${headerName} does not match the computed HMAC digest`
          ),
        ],
    signature,
    deliveryId,
    event,
  };
}

function buildMissingSignatureResult(
  options: VivaWebhookSignatureVerificationOptions
): VivaWebhookSignatureVerificationResult {
  const deliveryId = readWebhookHeader(options.headers, 'Viva-Delivery-Id');
  const event = readWebhookHeader(options.headers, 'Viva-Event');
  const issues: VivaWebhookSoftValidationIssue[] = [];

  if (!options.rawBody) {
    issues.push(
      createWebhookIssue(
        'rawBody',
        'missing',
        'Raw request body is required to verify a Viva webhook signature'
      )
    );
  }

  if (!options.secret) {
    issues.push(
      createWebhookIssue(
        'secret',
        'missing',
        'Webhook secret is required to verify a Viva webhook signature'
      )
    );
  }

  issues.push(
    createWebhookIssue(
      'Viva-Signature-256|Viva-Signature',
      'missing',
      'Viva-Signature-256 or Viva-Signature header is required to verify the webhook signature'
    )
  );

  return {
    valid: false,
    algorithm: null,
    issues,
    deliveryId,
    event,
  };
}

/** Verify a signed Data Services webhook notification using the raw request body. */
export function verifyVivaDataServicesWebhookSignature(
  options: VivaWebhookSignatureVerificationOptions
): VivaWebhookSignatureVerificationResult {
  if (options.algorithm === 'sha1') return verifyWithAlgorithm(options, 'sha1');
  if (options.algorithm === 'sha256')
    return verifyWithAlgorithm(options, 'sha256');

  const sha256Signature = readWebhookHeader(
    options.headers,
    'Viva-Signature-256'
  );
  if (sha256Signature !== undefined)
    return verifyWithAlgorithm(options, 'sha256');

  const sha1Signature = readWebhookHeader(options.headers, 'Viva-Signature');
  if (sha1Signature !== undefined) return verifyWithAlgorithm(options, 'sha1');

  return buildMissingSignatureResult(options);
}
