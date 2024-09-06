import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IGameDetails,
  IWinGame,
  gameSliceInterface
} from "../interfaces/interfaces";

const initialState: gameSliceInterface = {
  recentWins: [],
  gameType: "15",
  gameDetails: {},
  game_id: "",
  bettingPhase: true,
  winGameDetails: undefined
};

const gameSlice = createSlice({
  name: "gameSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGameDetail: (state, action: PayloadAction<IGameDetails>) => {
      state.gameDetails = action?.payload;
    },
    setGameID: (state, action: PayloadAction<string>) => {
      state.game_id = action?.payload;
    },
    setIsBettingPhase: (state, action: PayloadAction<boolean>) => {
      state.bettingPhase = action.payload;
    },
    setWinGameDetails: (state, action: PayloadAction<IWinGame>) => {
      state.winGameDetails = action.payload;
    },
    clearWinGameDetails: (state) => {
      state.winGameDetails = initialState.winGameDetails;
    },
    setGameType: (state, action: PayloadAction<"15" | "30">) => {
      state.gameType = action.payload;
    }
  }
  // extraReducers: {}
});

export const {
  setGameDetail,
  setGameID,
  setIsBettingPhase,
  setWinGameDetails,
  clearWinGameDetails,
  setGameType
} = gameSlice.actions;

export default gameSlice.reducer;
