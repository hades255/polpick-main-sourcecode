// import axios from "axios";
// import { baseUrlApi } from "../endpoints";

// const apiKey = process.env.CHANGELLY_API_KEY;
// const privateKey = process.env.CHANGELLY_PRIVATE_KEY;

// const changellyInstance = axios.create({
//   baseURL: baseUrlApi,
//   headers: {
//     "Content-Type": "application/json",
//     "X-Api-Key": apiKey
//   }
// });

// // function generateSignature(body: {
// //   jsonrpc: "2.0";
// //   id: string;
// //   method: string; //"getCurrenciesFull"
// //   params: {};
// // }) {
// //   return crypto.HmacSHA256(JSON.stringify(body), privateKey).toString();
// // }

// // export async function getCurrenciesFull() {
// //   const body = {
// //     jsonrpc: "2.0",
// //     id: "test",
// //     method: "getCurrenciesFull",
// //     params: {}
// //   };

// //   const signature = generateSignature(body);

// //   const response = await axiosInstance.post("", body, {
// //     headers: {
// //       "X-Api-Signature": signature
// //     }
// //   });

// //   return response.data;
// // }

// // Request interceptor
// changellyInstance.interceptors.request.use(
//   (config) => {
//     // You can add headers or other config adjustments here
//     // console.log("Request sent:", config);
//     // config.params.vs_currencies = store.getState().userSlice.currency || "usd"; //dyamic ~ if needed
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// changellyInstance.interceptors.response.use(
//   (response) => {
//     // console.log("Response received:", response);
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default changellyInstance;
