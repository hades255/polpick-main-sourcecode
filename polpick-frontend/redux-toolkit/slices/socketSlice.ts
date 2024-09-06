import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { socketSliceInterface } from "../interfaces/interfaces";

const initialState: socketSliceInterface = {
  socketID: "",
  nodeSocketID: ""
};

const socketSlice = createSlice({
  name: "socketSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSocketID: (state, action: PayloadAction<string>) => {
      // console.log("action socket", action.payload);
      state.socketID = action.payload;
    },
    setNodeSocketID: (state, action: PayloadAction<string>) => {
      // console.log("action socket", action.payload);
      state.nodeSocketID = action.payload;
    }
  },
  // extraReducers: {}
});

export const { setSocketID, setNodeSocketID } = socketSlice.actions;

export default socketSlice.reducer;
