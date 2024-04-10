//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUtenteResponse } from "../../interfaces/interfaces";

interface utenteState {
  selectedOption: string;
  myProfile: GetUtenteResponse | null;
}

const initialState: utenteState = {
  selectedOption: "profilo",
  myProfile: null,
};

const utenteReducer = createSlice({
  name: "utenteReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    setMyProfile: (state, action: PayloadAction<GetUtenteResponse>) => {
      state.myProfile = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setSelectedOption, setMyProfile } = utenteReducer.actions;
export default utenteReducer.reducer;
