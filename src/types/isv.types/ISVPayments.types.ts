import { VivaOrderCustomerInfo } from '../VivaOrder.types';

export interface ISVPaymentsOptions {
  /**
   * The amount associated with this payment order. Must be a positive, non-zero number.
   * The amount will be in the currency of the merchant account using the currency's smallest unit of measurement (e.g. cents of a euro).
   *
   * For example, if you want to create a payment for €100.37, you need to pass the value 10037.
   *
   * `integer <int64> >= 30`
   */
  amount: number;

  /**
   * The amount which will be paid out to the ISV partner.
   *
   * This value is NOT added to the amount, but it is considered as included in the amount parameter. Thus, the merchant will be paid amount-isvAmount.
   *
   * Additionally, When creating a payment order for a pre-authorization (with preauth = true), the isvAmount parameter should only be set when capturing the pre-authorization, and not when creating the initial payment order.
   *
   * `integer or null <int64>`
   * @default null
   */
  isvAmount?: number | null;

  /**
   * This optional parameter adds a friendly description to the payment order that you want to display to the customer on the payment form. It should be a short description of the items/services being purchased.
   *
   * Although optional, it is highly recommended to provide a description for the customer, so that the customer knows what he is being asked to pay for; this affects significantly the conversion rate of your online store.
   *
   * `string [ 1 .. 2048 ]`
   */
  customerTrns?: string;

  /** Information about the customer */
  customer?: VivaOrderCustomerInfo;

  /**
   * A descriptor tailored to the transaction, ensuring clarity and recognition for the buyer on their bank statement and 3DS verification page. The descriptor is limited to no more than 13 characters, can contain only Latin characters, numbers, and space. Special characters are replaced by spaces to meet banking standards.
   *
   * When specified, the buyer will see the first 8 characters of the merchant's trade name, followed by a space, and up to 13 characters of the dynamic descriptor. For example: MerchantX Descriptor. If not specified, the merchant's trade name will be shown up to 22 charachters.
   *
   * The dynamicDescriptor is included in the following webhooks with the Descriptor parameter:
   * - Transaction Payment Created
   * - Transaction Failed
   * - Transaction Reversal Created
   *
   * `string <= 13`
   */
  dynamicDescriptor?: string;

  /**
   * The time given to the customer to complete the payment. If the customer does not complete the payment within this time frame, the Payment Order is automatically cancelled. By using this parameter, you can define a different life span for the Payment Order.
   *
   * Value is in seconds and can be either smaller or greater than 1800 secs. Use value 65535 if you want the Payment Order to never expire.
   *
   * `integer <= 432000 sec`
   * @default 1800
   */
  paymentTimeout?: number;

  /**
   * The numeric code of the order's currency as defined in ISO 4712.
   *
   * Merchants can create order codes in different currencies than the currency of the country to which they are registered. The currency code specified in this parameter indicates the currency in which the customer's payment will be made.
   *
   * `string <int32>`
   * @default "Gets the merchant currency"
   */
  currencyCode?: string;

  /**
   * This will hold the selected amount as unavailable (without the customer being charged) for a period of time. No email receipt is sent out from us in this case as it is not a charge. To cancel a pre-auth, use the Cancel transaction API call in the same way that you would to reverse a payment. To capture a pre-auth, use the Create transaction API call in the same way that you would to create a payment.
   *
   * If set to true, a pre-auth transaction will be performed.
   *
   * Pre-authorizations are not available with recurring payments or instalments.
   *
   * Additionally, When creating a payment order for a pre-authorization (with preauth = true), the isvAmount and tipAmount parameters should only be set when capturing the pre-authorization, and not when creating the initial payment order.
   *
   * Furthermore, only payment methods which support pre-authorizations will be displayed to your customers.
   *
   * `boolean`
   * @default false
   */
  preauth?: boolean;

  /**
   * If this parameter is set to true, recurring payments are enabled so that the initial transaction ID can be used for subsequent payments. For details of how to create a recurring payment, view our Create a recurring payment tutorial. For an example of recurring payments in action, see our PHP code sample. The payment method needs to have support for recurring payments. Keep in mind it is your responsibility to have the customer's consent to perform recurring payments (using this parameter constitutes your confirmation that you have such consent)!
   *
   * Recurring payments are not available with pre-authorizations or card installments. Additionally, when creating a payment order with the allowRecurring parameter set to true, only payment methods which support recurring payments will be displayed to your customers.
   *
   * `boolean`
   * @default false
   */
  allowRecurring?: boolean;

  /**
   * The maximum number of installments that the customer can choose for this transaction. If this parameter is omitted, the customer will not see an option for paying with installments. The payment method needs to have support for installments. Installments are available only to merchants set up in Greece and are not available with recurring payments or pre-authorizations.
   *
   * Please note: If offering installments, the value provided by the merchant is not the number of installments the customer will select, and it is not mandatory for the customer to select installments at all. The process is as follows:
   *
   * 1. The merchant indicates the maximum number of installments they wish to offer to the customer
   * 2. It is then up to the customer whether they pay with or without installments
   * 3. If the customer decides to pay with installments, they are able to select the number of installments (up to the maximum specified by the merchant)
   *
   * `integer <int32> [ 1 .. 36 ]`
   * @default 0
   */
  maxInstallments?: number;

  /**
   * If you wish to create a payment order, and then send out an email to the customer to request payment, rather than immediately redirect the customer to the payment page to pay now, set the value to true, and the system will automatically send the customer an email notification. This is equivalent to sending a payment notification from the viva banking app.
   *
   * `boolean`
   * @default false
   */
  paymentNotification?: boolean;

  /**
   * The tip value (if applicable for the customer's purchase) which is already included in the amount of the payment order and marked as tip. It is in the currency of the merchant account using the currency's smallest unit of measurement (e.g. cents of a euro).
   *
   * When creating a payment order for a pre-authorization (with preauth = true), the tipAmount parameter should only be set when capturing the pre-authorization, and not when creating the initial payment order.
   *
   * `integer or null <int64>`
   * @default null
   */
  tipAmount?: number | null;

  /**
   * If this parameter is set to true, then any amount specified in the payment order is ignored (although still mandatory), and the customer is asked to indicate the amount they will pay. Note that if set to true, there will not be the option to pay with certain payment methods.
   *
   * `boolean`
   * @default false
   */
  disableExactAmount?: boolean;

  /**
   * If this parameter is set to true, the customer will not have the option to pay in cash at a Viva Spot, and the checkout page will not display the Cash (Viva Spot) and e-banking (ΔΙΑΣ) options.
   *
   * Available only to merchants set up in Greece.
   *
   * `boolean`
   * @default false
   */
  disableCash?: boolean;

  /**
   * If this parameter is set to true, the customer will not have the option to pay using their Viva personal account (wallet), and the checkout page will not display the Viva Wallet option.
   *
   * Available only to merchants set up in Greece, Malta and Cyprus.
   *
   * `boolean`
   * @default false
   */
  disableWallet?: boolean;

  /**
   * This is the code of the payment source associated with the merchant. If the merchant has defined multiple payment sources in their account, you need to define the sourceCode parameter when creating the payment order, so that the system selects the appropriate payment source.
   *
   * sourceCode is case-sensitive. If left unspecified, Default source code is used.
   *
   * `string`
   */
  sourceCode?: string;

  /**
   * This can be either an ID or a short description that helps you uniquely identify the transaction in the viva banking app. For example, this can be the customer order reference number. After logging in, go to Sales > Sales Transactions and find the transaction. Click on the Info button against the item to display the Transaction Details dialog box. The contents of the merchantTrns field will be displayed on the line below the timestamp information.
   *
   * `string [ 1 .. 2048 ]`
   */
  merchantTrns?: string;

  /**
   * The stateId parameter is used to indicate the status of an order, when handling redirect behavior according to order status. It must be used in conjunction with the urlFail parameter, if one is provided, the other must be as well. At present, the only supported value for stateId is: 1 (Expired). It indicates that if the order expires, make a redirection to the given address in urlFail parameter.
   *
   * 0 (Pending),
   * 1 (Expired),
   * 2 (Canceled),
   * 3 (Paid)
   *
   * Although other statuses such as 0, 2, 3 are part of the broader order statuses, *only 1 * is currently valid for use with this parameter in this context.
   *
   * `integer`
   */
  stateId?: number;

  /**
   * The urlFail parameter specifies the URL to redirect the user to in case of a failure based on the order stateId. It is used in conjunction with the stateId parameter to determine the failure scenario. If urlFail is present in the request, the stateId parameter must also be provided to indicate the specific failure status.
   *
   * `string`
   */
  urlFail?: string;

  /**
   * You can add several tags to a transaction that will help in grouping and filtering in the viva banking app. After logging in, go to Sales > Sales Transactions and expand the Advanced search feature. In the Tags field, enter the tag(s) you want to search with, then click on the Search button.
   *
   * `Array of strings`
   */
  tags?: string[];

  /**
   * This is the code of the payment source associated with the ISV partner (not with the merchant). If the ISV has defined multiple payment sources(navigate to the STORES menu to see all payment sources) in their account, you need to define the resellerSourceCode parameter when creating the payment order, so that the system selects the appropriate payment source.
   *
   * resellerSourceCode is case-sensitive. If left unspecified, Default source code is used.
   *
   * `string`
   */
  resellerSourceCode?: string;

  /**
   * These parameters are required when Klarna is being offered as a payment method.
   *
   * `object <array of objects>`
   */
  klarnaOrderOptions?: {
    attachment?: {
      body: string;
      contentType: string;
    };
    billingAddress?: {
      city?: string;
      email?: string;
      phone?: string;
      title?: string;
      region?: string;
      country?: string;
      attention?: string;
      givenName?: string;
      familyName?: string;
      postalCode?: string;
      streetAddress?: string;
      streetAddress2?: string;
      organizationName?: string;
    };
    shippingAddress?: {
      city?: string;
      email?: string;
      phone?: string;
      title?: string;
      region?: string;
      country?: string;
      attention?: string;
      givenName?: string;
      familyName?: string;
      postalCode?: string;
      streetAddress?: string;
      streetAddress2?: string;
      organizationName?: string;
    };
    orderLines: Array<{
      name: string;
      type?: string;
      taxRate?: number;
      quantity: number;
      unitPrice: number;
      imageUrl?: string;
      reference?: string;
      totalAmount: number;
      productUrl?: string;
      merchantData?: string;
      quantityUnit?: string;
      totalTaxAmount?: number;
      totalDiscountAmount?: number;
      subscription?: {
        name: string;
        interval: string;
        intervalCount: number;
      };
      productIdentifiers?: {
        size?: string;
        brand?: string;
        color?: string;
        categoryPath?: string;
        globalTradeItemNumber?: string;
        manufacturerPartNumber?: string;
      };
    }>;
  };
}
