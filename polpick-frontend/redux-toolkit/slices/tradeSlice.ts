import { TradeListSocketResponse } from "@/interface/socket.interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface tradeInitalState extends TradeListSocketResponse {
  others: any;
}
const initialState: tradeInitalState = {
  down_array: [],
  total_count: 0,
  total_trade: 0,
  down_total: 0,
  up_total: 0,
  up_array: [],
  down_return_percentage: 100,
  up_return_percentage: 100,
  others: undefined
};

const tradeSlice = createSlice({
  name: "tradeSlice",
  initialState,
  reducers: {
    setTraderList: (state, action: PayloadAction<TradeListSocketResponse>) => {
      state.down_array = action.payload.down_array;
      state.total_count = action.payload.total_count;
      state.total_trade = action.payload.total_trade;
      state.down_total = action.payload.down_total;
      state.up_total = action.payload.up_total;
      state.up_array = action.payload.up_array;
      state.down_return_percentage = action.payload.down_return_percentage;
      state.up_return_percentage = action.payload.up_return_percentage;
    }
    // setSocketID: (state, action: PayloadAction<string>) => {
    //   // console.log("action socket", action.payload);
    //   state.socketID = action.payload;
    // },
    // setNodeSocketID: (state, action: PayloadAction<string>) => {
    //   // console.log("action socket", action.payload);
    //   state.nodeSocketID = action.payload;
    // }
  }
  // extraReducers: {}
});

export const { setTraderList } = tradeSlice.actions;

export default tradeSlice.reducer;
