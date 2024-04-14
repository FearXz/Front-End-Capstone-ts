//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AziendaData } from "../../interfaces/interfaces";

interface AziendaState {
  myProfile: AziendaData | null;
}

const initialState: AziendaState = {
  myProfile: null,
};

const aziendaReducer = createSlice({
  name: "aziendaReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setMyProfileAzienda: (state, action: PayloadAction<AziendaData>) => {
      state.myProfile = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setMyProfileAzienda } = aziendaReducer.actions;
export default aziendaReducer.reducer;
