//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";

interface backofficeState {
  listaLocaliById: GetRistorantiByIdAziendaResponse[] | null;
}

const initialState: backofficeState = {
  listaLocaliById: null,
};

const backofficeReducer = createSlice({
  name: "backofficeReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setListaLocaliById: (state, action: PayloadAction<GetRistorantiByIdAziendaResponse[]>) => {
      state.listaLocaliById = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setListaLocaliById } = backofficeReducer.actions;
export default backofficeReducer.reducer;
