import { userData } from "@/types/common.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";

const initialState: userSliceData = {
  isLoggedIn: true,
  userData: null,
  currency: "usd",
  tempAffiliateLink: undefined,
  userTicketProgress: null,
  fullCompletionCount: 0
};

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: userData | null }) => {
      // state.email
      state.userData = payload;
      state.isLoggedIn = true;
    },
    checkLoggedInServer: (state, { payload }) => {
      state.isLoggedIn = payload?.hasToken;
      state.userData = payload?.user;
    },
    setTradeCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setTempAffiliateLink: (state, action: PayloadAction<string>) => {
      state.tempAffiliateLink = action.payload;
    },
    setUserTicketProgress: (
      state,
      action: PayloadAction<{ [key: string]: number }>
    ) => {
      state.userTicketProgress = action.payload;
    },
    setCompletionCount: (state, action: PayloadAction<number>) => {
      state.fullCompletionCount = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.currency = initialState.currency;
      state.tempAffiliateLink = initialState.tempAffiliateLink;
      state.userTicketProgress = initialState.userTicketProgress;
      // cookie.remove("privy_token");
      // cookie.remove("user");

      destroyCookie(null, "user_wallet", { path: "/" }); //
      destroyCookie(null, process.env.NEXT_APP_TOKEN_NAME!, { path: "/" });

      // window.location.href = "/login";
    }
  }
  // extraReducers: {}
});

export const {
  setLoginData,
  checkLoggedInServer,
  setTradeCurrency,
  logout,
  setTempAffiliateLink,
  setUserTicketProgress,
  setCompletionCount
} = userSlice.actions;

export default userSlice.reducer;
