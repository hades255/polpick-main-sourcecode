/* eslint-disable consistent-return */
import axios from "axios";
import axiosCoinbase from "../coinbaseExchange";
import { coinBaseExchangeRateAPI, endpoints } from "../endpoints";

export const getCurrencyToCoin = async (currency: string = "usd") => {
  const res = await axiosCoinbase.get<any>(endpoints.coinBase.test(currency));
  return res.data;
};

export async function coinBaseExchangeRequest(currency: string = "eth") {
  try {
    // const contentType = "application/json";

    return await axios.get(
      `${coinBaseExchangeRateAPI}exchange-rates?currency=${currency}`
    );
  } catch (e) {
    console.log("coinBaseExchangeRequest Error:", e);
  }
}
