import { VivaPaymentOrderOptions } from '../VivaOrder.types';

export interface KlarnaOrderAttachment {
  /** The content of the extra merchant data should be presented as a string inside this property. The body should be an object containing any of the keys and sub-objects described below serialized to JSON. More information on that object can be found [here](https://docs.klarna.com/api/attachment-schema/). */
  body: string;
  /** The content type of the body. It is usually represented as "application/vnd.klarna.internal.emd-v2+json". */
  contentType: string;
}

export interface KlarnaOrderAddress {
  /** Customer’s city. */
  city?: string;
  /** Customer’s email address. */
  email?: string;
  /** Phone number. Preferably a mobile phone number. */
  phone?: string;
  /** Customer’s Title. Allowed values per country = UK- 'Mr', 'Ms' | DE- 'Herr', 'Frau' | AT- 'Herr, 'Frau' | de-CH- 'Herr, 'Frau' | it-CH- 'Sig.', 'Sig.ra' | fr-CH- 'M', 'Mme' | BE- 'Dhr.', 'Mevr.' | NL- 'Dhr.', 'Mevr.' */
  title?: string;
  /** Customer’s region or state - Mandatory for US and AU market. Validations according to ISO 3166-2 format, e.g. OH, NJ, etc. */
  region?: string;
  /** Customer’s country. This value overrides the purchase country if they are different. Should follow the standard of ISO 3166 alpha-2. E.g. GB, US, DE, SE. */
  country?: string;
  /** ‘Attn.’ (if applicable). Only applicable for B2B customers. */
  attention?: string;
  /** Customer's given name in UTF-8 encoding. Cannot be only numbers, must be more than 1 character. More information can be found in [this link](https://docs.klarna.com/klarna-payments/in-depth-knowledge/customer-data-requirements/#details-needed-per-market). */
  givenName?: string;
  /** Customer's family name in UTF-8 encoding. Cannot be only numbers, must be more than 1 character. More information can be found in [this link](https://docs.klarna.com/klarna-payments/in-depth-knowledge/customer-data-requirements/#details-needed-per-market). */
  familyName?: string;
  /** Customer’s postal code. Validation according to Universal Postal Union addressing systems. E.g. 12345, W1G OPW. */
  postalCode?: string;
  /** Customer’s street address. Regional formatting is required, as follows (UK/US/FR- 33 Cavendish Square | Rest of EU- De Ruijterkade 7) */
  streetAddress?: string;
  /** Customer’s street address. Second Line. */
  streetAddress2?: string;
  /** Organization name (if applicable). Only applicable for B2B customers. */
  organizationName?: string;
}

export interface KlarnaOrderOrderLines {
  /** Descriptive name of the order line item. */
  name: string;
  /** Type of the order line item. The possible values are - physical, discount, shipping_fee, sales_tax, digital, gift_card, store_credit, surcharge */
  type?:
    | 'physical'
    | 'discount'
    | 'shipping_fee'
    | 'sales_tax'
    | 'digital'
    | 'gift_card'
    | 'store_credit'
    | 'surcharge';
  /** Tax rate of the order line. Non-negative value. The percentage value is represented with two implicit decimals. I.e 2000 = 20%. */
  taxRate?: number;
  /** Quantity of the order line item. Must be a non-negative number. */
  quantity: number;
  /** Price for a single unit of the order line. Must be defined as minor units. Includes tax, excludes discount. (max value = 200000000) */
  unitPrice: number;
  /** URL to an image that can be later embedded in communications between Klarna and the customer. (max 1024 characters). A minimum of 250x250 px resolution is recommended for the image to look good in the Klarna app, and below 50x50 px won't even show. We recommend using a good sized image (650x650 px or more), however the file size must not exceed 12MB. */
  imageUrl?: string;
  /** Client facing article number, SKU or similar. Max length is 256 characters. */
  reference?: string;
  /** Total amount of the order line. Must be defined as minor units. Includes tax and discount. E.g.- 2000=20 euros Value = (quantity x unit_price) - total_discount_amount. (max value= 200000000) */
  totalAmount: number;
  /** URL to the product in the merchant’s webshop that can be later used in communications between Klarna and the customer. (max 1024 characters) */
  productUrl?: string;
  /** Used for storing merchant's internal order number or other reference. Pass through field. (max 1024 characters) */
  merchantData?: string;
  /** Unit used to describe the quantity, e.g. kg, pcs, etc. If defined the value has to be 1-8 characters. */
  quantityUnit?: string;
  /** Total tax amount of the order line. Must be within ±1 of total_amount - total_amount 10000 / (10000 + tax_rate). Negative when type is discount. */
  totalTaxAmount?: number;
  /** Non-negative minor units. Includes tax. E.g.- 500=5 euros */
  totalDiscountAmount?: number;
  /** Subscription information */
  subscription?: {
    /** The name of the subscription product */
    name: string;
    /** The cadence unit for this ("DAY", "WEEK", "MONTH", "YEAR") */
    interval: string;
    /** The number of intervals (>=1) */
    intervalCount: number;
  };
  /** Product identifying information. */
  productIdentifiers?: {
    /** Size to be shown to the end customer (max 64 characters). */
    size?: string;
    /** The product's brand name as generally recognized by consumers. If no brand is available for a product, do not supply any value. */
    brand?: string;
    /** Color to be shown to the end customer (max 64 characters). */
    color?: string;
    /** The product's category path as used in the merchant's webshop. Include the full and most detailed category and separate the segments with ' > ' */
    categoryPath?: string;
    /** The product's Global Trade Item Number (GTIN). Common types of GTIN are EAN, ISBN or UPC. Exclude dashes and spaces, where possible */
    globalTradeItemNumber?: string;
    /** The product's Manufacturer Part Number (MPN), which - together with the brand - uniquely identifies a product. Only submit MPNs assigned by a manufacturer and use the most specific MPN possible */
    manufacturerPartNumber?: string;
  };
}

export interface KlarnaOrderOptions {
  /** Not applicable for all merchants (mandatory only for Marketplaces). Client must agree with Klarna the content of the attachment. */
  attachment?: KlarnaOrderAttachment;
  /** Billing address information. */
  billingAddress?: KlarnaOrderAddress;
  /** Shipping address information. */
  shippingAddress?: KlarnaOrderAddress;
  orderLines: KlarnaOrderOrderLines[];
}

export interface VivaMarketOrdersOptions extends VivaPaymentOrderOptions {
  transfer?: {
    amount?: number | null;
    platformFee?: number | null;
    connectedAccountId: string;
  };
  klarnaOrderOptions?: Array<KlarnaOrderOptions>;
}
