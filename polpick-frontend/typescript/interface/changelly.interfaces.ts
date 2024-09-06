interface Provider {
  providerCode: string;
  supportedFlows: string[];
}

export interface CountryInterface {
  code: string;
  name: string;
  currency: string;
  providers: Provider[];
}

export interface iFetChangellyCountryList {
  status: 200;
  data: CountryInterface[];
}

export interface iChangellyPaymentPayload {
  externalUserId: string;
  externalOrderId: string;
  providerCode?: "moonpay" | "banxa" | "wert" | "simplex" | "transak"; //["moonpay", "banxa", "wert", "simplex", "transak"]
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  state?: string;
  walletAddress: string;
  walletExtraId: string;
  paymentMethod:
    | "card"
    | "IDEAL"
    | "gbp_bank_transfer"
    | "sepa_bank_transfer"
    | "apple_pay"
    | "yellow_card_bank_transfer"
    | "pix"
    | "pay_id"
    | "pay_pal";
}

export interface iChangellyOrderData {
  redirectUrl: string;
  orderId: string;
  externalUserId: string;
  externalOrderId: string;
  providerCode: string;
  type: string;
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  state: string;
  ip: string | null;
  walletAddress: string;
  walletExtraId: string;
  refundAddress: string | null;
  paymentMethod: string;
  userAgent: string | null;
  metadata: any | null;
  createdAt: string;
}
export interface ChangellyOrderCreateResponse {
  status: number;
  data: iChangellyOrderData;
}

export interface CurrencyListObject {
  name: string;
  ticker: string;
  fullName: string;
  enabled: boolean;
  enabledFrom: boolean;
  enabledTo: boolean;
  fixRateEnabled: boolean;
  payinConfirmations: number;
  addressUrl: string;
  transactionUrl: string;
  image: string;
  fixedTime: number;
  contractAddress?: string; // Optional as not all cryptocurrencies might have this
  protocol: string;
  blockchain: string;
}

export interface ChangellyCommonError {
  code: number;
  data: any;
  message: string;
}
export interface IGetCurrencyListResponse {
  jsonrpc: string;
  result: CurrencyListObject[];
}

export interface IGetCurrExchangeAmtPayload {
  params: {
    from: string;
    to: string;
    amountFrom: string;
  };
}

export interface IExchangeAmtObject {
  from: string;
  to: string;
  networkFee: string;
  amountFrom: string;
  amountTo: string;
  max: string;
  maxFrom: string;
  maxTo: string;
  min: string;
  minFrom: string;
  minTo: string;
  visibleAmount: string;
  rate: string;
  fee: string;
}
export interface IGetCurrExchangeAmtResponse {
  jsonrpc: string;
  id: string;
  method: string;
  result: IExchangeAmtObject[];
  error?: ChangellyCommonError;
}
export interface IGetMinExchangePayload {
  params: {
    from: string;
    to: string;
  };
}

export interface IGetMinExchangeResponse {
  id: string;
  jsonrpc: string;
  result: string;
  error?: ChangellyCommonError;
}

export interface IGetMinMaxExchangePayload {
  params: {
    from: string;
    to: string;
  }[];
}

export interface IGetMinMaxExchangeResponse {
  id: string;
  jsonrpc: string;
  result: {
    from: string;
    to: string;
    minAmountFloat: string;
    maxAmountFloat: string;
    minAmountFixed: string;
    maxAmountFixed: string;
  }[];
  error?: ChangellyCommonError;
}

export interface ICreateChangellyTransationPayload {
  params: {
    from: string;
    to: string;
    address: string;
    amountFrom: string;
  };
}
export interface ICreateChangellyTransactionResponse {
  id: string;
  jsonrpc: string;
  result: {
    id: string;
    trackUrl: string;
    createdAt: number;
    type: string;
    status: string;
    currencyFrom: string;
    currencyTo: string;
    payinAddress: string;
    amountExpectedFrom: string;
    payoutAddress: string;
    amountExpectedTo: string;
    networkFee: string;
  };
  error?: ChangellyCommonError;
}

export interface IChangellyOffersPayload {
  externalUserId?: string;
  providerCode: string;
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  state?: string;
}

export interface ChangellyPaymentMethodOffer {
  amountExpectedTo: number;
  method: string;
  methodName: string;
  rate: number;
  invertedRate: number;
  fee: number;
}
export interface IChangellyOffersResponse {
  status: number;
  data: {
    providerCode: string;
    rate: number;
    invertedRate: number;
    fee: number;
    amountFrom: number;
    amountExpectedTo: number;
    paymentMethodOffer: ChangellyPaymentMethodOffer[];
    errorDetails?: any[];
    errorMessage: string;
    errorType: string;
  };
}

export interface ChnagellyExchangeProvider {
  code: string;
  name: string;
  trustPilotRating: string | null;
  iconUrl: string;
}

export interface IgetChangellyExchangeProvidersResponse {
  status: number;
  data: ChnagellyExchangeProvider[];
}
