//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUtenteResponse } from "../../interfaces/interfaces";

interface utenteState {
  myProfile: GetUtenteResponse | null;
}

const initialState: utenteState = {
  myProfile: null,
};

const utenteReducer = createSlice({
  name: "utenteReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setMyProfile: (state, action: PayloadAction<GetUtenteResponse>) => {
      state.myProfile = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setMyProfile } = utenteReducer.actions;
export default utenteReducer.reducer;
