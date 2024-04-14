//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUtenteResponse } from "../../interfaces/interfaces";

interface AziendaState {
  myProfile: GetUtenteResponse | null;
}

const initialState: AziendaState = {
  myProfile: null,
};

const aziendaReducer = createSlice({
  name: "aziendaReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setMyProfile: (state, action: PayloadAction<GetUtenteResponse>) => {
      state.myProfile = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setMyProfile } = aziendaReducer.actions;
export default aziendaReducer.reducer;
