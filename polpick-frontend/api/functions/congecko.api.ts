/* eslint-disable consistent-return */
import axios from "axios";
import axiosGecko from "../coinGecko";
import { endpoints, geckoBaseURLAPI } from "../endpoints";

export const getEthToDollar = async () => {
  const res = await axiosGecko.get<{ ethereum: { usd: number } }>(
    endpoints.coinGecko.simplePrice
  );
  return res.data;
};

interface coinGeckoRequest {
  ids?: string;
  vs_currencies: string;
}
export async function coinGeckoRequest({
  ids = "ethereum",
  vs_currencies = "usd"
}: coinGeckoRequest) {
  try {
    // const contentType = "application/json";

    return await axios.get(
      `${geckoBaseURLAPI}simple/price?ids=${ids}&vs_currencies=${vs_currencies}`
      //   {
      //     headers: {
      //       "Content-Type": contentType,
      //     },
      //   }
    );
  } catch (e) {
    console.log("coinGeckoRequest Error:", e);
  }
}
