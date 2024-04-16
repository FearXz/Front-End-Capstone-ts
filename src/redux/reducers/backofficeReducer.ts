//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetBoLocaleIdResponse, GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";

interface backofficeState {
  listaLocaliById: GetRistorantiByIdAziendaResponse[] | null;
  localeById: GetBoLocaleIdResponse | null;
}

const initialState: backofficeState = {
  listaLocaliById: null,
  localeById: null,
};

const backofficeReducer = createSlice({
  name: "backofficeReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setListaLocaliById: (state, action: PayloadAction<GetRistorantiByIdAziendaResponse[]>) => {
      state.listaLocaliById = action.payload;
    },
    setLocaleById: (state, action: PayloadAction<GetBoLocaleIdResponse>) => {
      state.localeById = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setListaLocaliById, setLocaleById } = backofficeReducer.actions;
export default backofficeReducer.reducer;
