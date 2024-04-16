//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoOrdiniLocaleId, GetBoLocaleIdResponse, GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";

interface backofficeState {
  listaLocaliById: GetRistorantiByIdAziendaResponse[] | null;
  localeById: GetBoLocaleIdResponse | null;
  selectedOrderModal: BoOrdiniLocaleId | null;
}

const initialState: backofficeState = {
  listaLocaliById: null,
  localeById: null,
  selectedOrderModal: null,
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
    setSelectedOrderModal: (state, action: PayloadAction<BoOrdiniLocaleId | null>) => {
      state.selectedOrderModal = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setListaLocaliById, setLocaleById, setSelectedOrderModal } = backofficeReducer.actions;
export default backofficeReducer.reducer;
