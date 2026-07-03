import {
  VivaIsvWebhookVerificationBody,
  VivaMerchantWebhookVerificationBody,
  VivaWebhookVerificationResponse,
} from '../../types/VivaWebHook.types';

/** Build the JSON body Viva expects during Merchant and Marketplace webhook URL verification. */
export function buildVivaMerchantWebhookVerificationBody(
  key: string
): VivaMerchantWebhookVerificationBody {
  return { Key: key };
}

/** Build the JSON body Viva expects during ISV webhook URL verification. */
export function buildVivaIsvWebhookVerificationBody(
  key: string
): VivaIsvWebhookVerificationBody {
  return { key };
}

/** Build a framework-agnostic Merchant and Marketplace webhook verification response. */
export function buildVivaMerchantWebhookVerificationResponse(
  key: string
): VivaWebhookVerificationResponse<VivaMerchantWebhookVerificationBody> {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: buildVivaMerchantWebhookVerificationBody(key),
  };
}

/** Build a framework-agnostic ISV webhook verification response. */
export function buildVivaIsvWebhookVerificationResponse(
  key: string
): VivaWebhookVerificationResponse<VivaIsvWebhookVerificationBody> {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: buildVivaIsvWebhookVerificationBody(key),
  };
}
