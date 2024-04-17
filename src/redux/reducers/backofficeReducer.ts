//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  BoOrdiniLocaleId,
  GetBoLocaleIdResponse,
  GetRistorantiByIdAziendaResponse,
  GiorniDiChiusura,
} from "../../interfaces/interfaces";
import { ALLORDER } from "../../functions/config";

interface backofficeState {
  listaLocaliById: GetRistorantiByIdAziendaResponse[] | null;
  localeById: GetBoLocaleIdResponse | null;
  selectedOrderModal: BoOrdiniLocaleId | null;
  searchFilterOrder: string;
  statusFilterOrder: string;
  listaGiorniDiChiusura: GiorniDiChiusura[];
}

const initialState: backofficeState = {
  listaLocaliById: null,
  localeById: null,
  selectedOrderModal: null,
  searchFilterOrder: "",
  statusFilterOrder: ALLORDER,
  listaGiorniDiChiusura: [],
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
    setSearchFilterOrder: (state, action: PayloadAction<string>) => {
      state.searchFilterOrder = action.payload;
    },
    setStatusFilterOrder: (state, action: PayloadAction<string>) => {
      state.statusFilterOrder = action.payload;
    },
    setListaGiorniDiChiusura: (state, action: PayloadAction<GiorniDiChiusura[]>) => {
      state.listaGiorniDiChiusura = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const {
  setListaLocaliById,
  setLocaleById,
  setSelectedOrderModal,
  setSearchFilterOrder,
  setStatusFilterOrder,
  setListaGiorniDiChiusura,
} = backofficeReducer.actions;
export default backofficeReducer.reducer;
