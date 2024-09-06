// lib/axiosInstance.js
import axios from "axios";
import { geckoBaseURLAPI } from "../endpoints";

const axiosGecko = axios.create({
  baseURL: geckoBaseURLAPI,
  params: {
    ids: "ethereum",
    vs_currencies: "usd"
  }
});

// Request interceptor
axiosGecko.interceptors.request.use(
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
axiosGecko.interceptors.response.use(
  (response) => {
    // console.log("Response received:", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosGecko;
