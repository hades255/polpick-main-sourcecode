// store/toggleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface muteAudio {
  isMute: boolean;
}

// Define the initial state using the session storage or a default value
const initialState: muteAudio = {
  isMute:
    typeof window !== "undefined" && sessionStorage.getItem("muteAudio")
      ? JSON.parse(sessionStorage.getItem("muteAudio") as string)
      : false
};

export const muteSlice = createSlice({
  name: "mute",
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.isMute = !state.isMute;
      sessionStorage.setItem("muteAudio", JSON.stringify(state.isMute));
    },
    setMute: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload;
      sessionStorage.setItem("muteAudio", JSON.stringify(state.isMute));
    }
  }
});

export const { toggleMute, setMute } = muteSlice.actions;

export default muteSlice.reducer;
