import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { walletSliceInterface } from "../interfaces/interfaces";

const initialState: walletSliceInterface = {
  wallet: "",
  walletBalance: 0,
  usd_price: 0,
  usdBalance: 0
};

const walletSlice = createSlice({
  name: "walletSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
    setWalletBalance: (state, action: PayloadAction<number>) => {
      state.walletBalance = action.payload;
      state.usdBalance = action.payload * state.usd_price;
    },
    setUSDPrice: (state, action: PayloadAction<number>) => {
      state.usd_price = action.payload;
    }
  }
  // extraReducers: {}
});

export const { setWallet, setWalletBalance, setUSDPrice } = walletSlice.actions;

export default walletSlice.reducer;
