//slice reducer
import { createSlice } from "@reduxjs/toolkit";
import { CoordinateSearch } from "../../interfaces/interfaces";

interface persistedInfoState {
  indirizzoCercato: CoordinateSearch | null;
}

const initialState: persistedInfoState = {
  indirizzoCercato: null,
};

const persistedInfoReducer = createSlice({
  name: "persistedInfoReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setIndirizzoCercato: (state, action) => {
      state.indirizzoCercato = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setIndirizzoCercato } = persistedInfoReducer.actions;
export default persistedInfoReducer.reducer;
