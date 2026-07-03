import {
  VivaWebhookEnvelope,
  VivaWebhookHeaders,
  VivaWebhookSoftValidationIssue,
} from '../../types/VivaWebHook.types';

export type WebhookRecord = Record<string, unknown>;

export function isWebhookRecord(value: unknown): value is WebhookRecord {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function getWebhookEventData<EventData>(
  payload: unknown
): EventData | null {
  if (!isWebhookRecord(payload)) return null;

  const envelope = payload as VivaWebhookEnvelope<EventData>;
  if (isWebhookRecord(envelope.EventData))
    return envelope.EventData as EventData;

  return payload as EventData;
}

export function getWebhookEnvelope(
  payload: unknown
): VivaWebhookEnvelope | null {
  if (!isWebhookRecord(payload)) return null;
  return payload as VivaWebhookEnvelope;
}

export function createWebhookIssue(
  field: string,
  code: VivaWebhookSoftValidationIssue['code'],
  message: string,
  expected?: unknown,
  actual?: unknown
): VivaWebhookSoftValidationIssue {
  return {
    field,
    code,
    message,
    expected,
    actual,
  };
}

export function isMissingWebhookValue(value: unknown): boolean {
  return value === undefined || value === null || value === '';
}

export function webhookValuesMatch(
  actual: unknown,
  expected: unknown
): boolean {
  if (typeof actual === 'number' && typeof expected === 'number') {
    return actual === expected;
  }

  if (typeof actual === 'boolean' || typeof expected === 'boolean') {
    return actual === expected;
  }

  return String(actual) === String(expected);
}

export function readWebhookHeader(
  headers: VivaWebhookHeaders | undefined,
  name: string
): string | undefined {
  if (!headers) return undefined;

  const direct = headers[name];
  if (Array.isArray(direct)) return direct[0];
  if (direct !== undefined && direct !== null) return String(direct);

  const lowerName = name.toLowerCase();
  const matchingKey = Object.keys(headers).find(
    (key) => key.toLowerCase() === lowerName
  );

  if (!matchingKey) return undefined;

  const value = headers[matchingKey];
  if (Array.isArray(value)) return value[0];
  if (value === undefined || value === null) return undefined;
  return String(value);
}

export function readWebhookNumberHeader(
  headers: VivaWebhookHeaders | undefined,
  name: string
): number | null | undefined {
  const value = readWebhookHeader(headers, name);
  if (value === undefined) return undefined;
  if (value === '' || value === 'null') return null;

  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? undefined : numberValue;
}

export interface WebhookFieldCheck {
  field: string;
  actual: unknown;
  expected?: unknown;
  required?: boolean;
}

export function validateWebhookFields(
  checks: WebhookFieldCheck[]
): VivaWebhookSoftValidationIssue[] {
  const issues: VivaWebhookSoftValidationIssue[] = [];

  for (const check of checks) {
    if (check.required && isMissingWebhookValue(check.actual)) {
      issues.push(
        createWebhookIssue(
          check.field,
          'missing',
          `${check.field} is missing from the webhook payload`
        )
      );
      continue;
    }

    if (check.expected === undefined) continue;

    if (isMissingWebhookValue(check.actual)) {
      issues.push(
        createWebhookIssue(
          check.field,
          'missing',
          `${check.field} is missing from the webhook payload`,
          check.expected,
          check.actual
        )
      );
      continue;
    }

    if (!webhookValuesMatch(check.actual, check.expected)) {
      issues.push(
        createWebhookIssue(
          check.field,
          'mismatch',
          `${check.field} does not match the expected value`,
          check.expected,
          check.actual
        )
      );
    }
  }

  return issues;
}
