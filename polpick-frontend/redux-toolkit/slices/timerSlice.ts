import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { gameSocketData } from "../interfaces/interfaces";

export interface timerSliceInterface {
  currentGameStatus: gameSocketData | null;
}
const initialState: timerSliceInterface = {
  currentGameStatus: null
};

const timerSlice = createSlice({
  name: "timerSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // setSmallTimer: (state, action: PayloadAction<number>) => {
    //   state.smallTimer = action.payload;
    // },
    // setBigTimer: (state, action: PayloadAction<number>) => {
    //   state.smallTimer = action.payload;
    // },
    setCurrentGameStatus: (state, action: PayloadAction<gameSocketData>) => {
      // state.currentGameStatus = action.payload;
      state.currentGameStatus = {
        ...action.payload,
        seconds: Number(action.payload.seconds)
      };
    }

    //   setSocketID: (state, action: PayloadAction<string>) => {
    //     // console.log("action socket", action.payload);
    //     state.socketID = action.payload;
    //   },
    //   setNodeSocketID: (state, action: PayloadAction<string>) => {
    //     // console.log("action socket", action.payload);
    //     state.nodeSocketID = action.payload;
    //   }
  },
  // extraReducers: {}
});

export const { setCurrentGameStatus } = timerSlice.actions;

export default timerSlice.reducer;
