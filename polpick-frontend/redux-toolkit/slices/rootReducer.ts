/* eslint-disable import/no-cycle */
import affiliateSlice from "./affiliate.slice";
import gameSlice from "./game.slice";
import globalSlice from "./global.slice";
import socketSlice from "./socketSlice";
import soundSlice from "./soundSlice";
import timerSlice from "./timerSlice";
import tradeSlice from "./tradeSlice";
import userSlice from "./userSlice";
import walletSlice from "./walletSlice";

const rootReducer = {
  userSlice,
  globalSlice,
  walletSlice,
  socketSlice,
  tradeSlice,
  timerSlice,
  gameSlice,
  affiliateSlice,
  soundSlice
};

export default rootReducer;
