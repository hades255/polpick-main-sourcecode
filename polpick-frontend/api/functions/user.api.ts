/* eslint-disable import/no-cycle */
import { IGetWalletUserQuery } from "@/interface/apiresp.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export type IFormInput = {
  walletId: string;
  affiliate_link?: string;
};

export type IOrderListInput = {
  page: number;
  limit: number;
  sort: {
    order: "asc" | "desc";
    field: string;
  };
  walletId: string;
};

export interface iUserTransaction {
  _id: string;
  tradeAmount: number;
  tradeResult: boolean;
  winningAmount: number;
  profitAmount: number;
  createdAt: string;
}
export interface iUserWinDetails {
  highestWinStreak: number;
  totalNumberOfWins: number;
  highestWinning: number;
}

export interface iOrderHistoryByWalletResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: iUserTransaction[];
  limit: number;
  page: number;
  pages: number;
  total: number;
  user_data: iUserWinDetails;
}

// export interface iUpdateUserDetailsPayload{
//   profile_image:File,
//   walletId:string,
//   country:string
// }

export const createWalletUser = async (body: IFormInput) => {
  const res = await axiosInstance.post<IGetWalletUserQuery>(
    endpoints.auth.create_wallet_user,
    body
  );
  return res?.data;
};

export const getOrderHistoryByWallet = async (body: IOrderListInput) => {
  const res = await axiosInstance.post<iOrderHistoryByWalletResponse>(
    endpoints.user.orderList,
    body
  );
  return res?.data;
};

export const updateUserDetails = async (body: FormData) => {
  const res = await axiosInstance.post<any>(endpoints.auth.update_user, body);
  return res?.data;
};

// export const getUser = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IGetWalletUserQuery>(
//     endpoints.auth.create_wallet_user,
//     body
//   );
//   return res;
// };

// export const signUpMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.signup,
//     body
//   );
//   return res;
// };
// export const loginMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.login,
//     body
//   );
//   return res;
// };
// export const GetProfileDetails = async () => {
//   const res = await axiosInstance.get<IgetSignUpQuery>(
//     endpoints.auth.profileDetails
//   );
//   return res;
// };
// export const signUpProfileMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.signUpProfile,
//     body
//   );
//   return res;
// };
