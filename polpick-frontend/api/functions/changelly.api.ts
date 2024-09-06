/* eslint-disable consistent-return */

import {
  ChangellyOrderCreateResponse,
  IChangellyOffersPayload,
  IChangellyOffersResponse,
  ICreateChangellyTransactionResponse,
  ICreateChangellyTransationPayload,
  IGetCurrExchangeAmtPayload,
  IGetCurrExchangeAmtResponse,
  IGetCurrencyListResponse,
  IGetMinExchangePayload,
  IGetMinExchangeResponse,
  IGetMinMaxExchangePayload,
  IGetMinMaxExchangeResponse,
  IgetChangellyExchangeProvidersResponse,
  iChangellyPaymentPayload,
  iFetChangellyCountryList
} from "@/interface/changelly.interfaces";

import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const getChangellyCountryList =
  async (): Promise<iFetChangellyCountryList> => {
    const res = await axiosInstance.get(
      endpoints.changelly.buy.get_country_list
    );
    return res.data;
  };

export const createChangellyPayment = async (
  body: iChangellyPaymentPayload
): Promise<ChangellyOrderCreateResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.buy.create_changelly_payment,
    body
  );
  return res.data;
};

export const getChangellyCurrencyAll =
  async (): Promise<IGetCurrencyListResponse> => {
    const res = await axiosInstance.post(
      endpoints.changelly.exchange.GetCurrencyAll,
      { params: {} }
    );
    return res.data;
  };

export const getChangellyExchangeAmount = async (
  body: IGetCurrExchangeAmtPayload
): Promise<IGetCurrExchangeAmtResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.exchange.GetExchangeAmount,
    body
  );
  return res.data;
};

export const getChangellyMinimumExchangeAmount = async (
  body: IGetMinExchangePayload
): Promise<IGetMinExchangeResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.exchange.GetMinimumExchangeAmount,
    body
  );
  return res.data;
};

export const getChangellyMinMaxExchangeAmount = async (
  body: IGetMinMaxExchangePayload
): Promise<IGetMinMaxExchangeResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.exchange.GetMinMaxExchangeAmount,
    body
  );
  return res.data;
};

export const createChangellyTransaction = async (
  body: ICreateChangellyTransationPayload
): Promise<ICreateChangellyTransactionResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.exchange.CreteChangellyTransaction,
    body
  );
  return res.data;
};

export const getChangellyOffers = async (
  body: IChangellyOffersPayload
): Promise<IChangellyOffersResponse> => {
  const res = await axiosInstance.post(
    endpoints.changelly.exchange.GetPayOffers,
    body
  );
  return res.data;
};

export const getChangellyAvailableProviders =
  async (): Promise<IgetChangellyExchangeProvidersResponse> => {
    const res = await axiosInstance.get(
      endpoints.changelly.buy.GetAvailableProviders
    );
    return res.data;
  };
