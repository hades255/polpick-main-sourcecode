import axios from "axios";
import { coinBaseExchangeRateAPI } from "../endpoints";

const axiosCoinbase = axios.create({
  baseURL: coinBaseExchangeRateAPI
  //   params: {
  //     ids: "ethereum",
  //     vs_currencies: "usd"
  //   }
});

// Request interceptor
axiosCoinbase.interceptors.request.use(
  (config) => {
    // You can add headers or other config adjustments here
    // console.log("Request sent:", config);
    // config.params.vs_currencies = store.getState().userSlice.currency || "usd"; //dyamic ~ if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosCoinbase.interceptors.response.use(
  (response) => {
    // console.log("Response received:", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCoinbase;
