import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { affiliateSliceInterface } from "../interfaces/interfaces";

const initialState: affiliateSliceInterface = {
  tab_id: 0
};

const affiliateSlice = createSlice({
  name: "affiliateSlice",
  initialState,
  reducers: {
    setAffilateTabValue: (state, action: PayloadAction<number>) => {
      state.tab_id = action?.payload;
    }
  },
  extraReducers: {}
});

export const { setAffilateTabValue } = affiliateSlice.actions;

export default affiliateSlice.reducer;
