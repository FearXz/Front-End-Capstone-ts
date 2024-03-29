//slice reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaRistoranti: null,
};

const searchRistoranteReducer = createSlice({
  name: "searchRistoranteReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setListaRistoranti: (state, action) => {
      state.listaRistoranti = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setListaRistoranti } = searchRistoranteReducer.actions;
export default searchRistoranteReducer.reducer;
