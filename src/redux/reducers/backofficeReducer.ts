//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  BoOrdiniLocaleId,
  GetBoLocaleIdResponse,
  GetRistorantiByIdAziendaResponse,
  GetTipoProdottoResponse,
  GiorniDiChiusura,
  IngredientiProdottiLocale,
  ProdottiLocale,
  categorieRistorante,
} from "../../interfaces/interfaces";
import { ALLORDER } from "../../functions/config";

interface backofficeState {
  listaLocaliById: GetRistorantiByIdAziendaResponse[] | null;
  localeById: GetBoLocaleIdResponse | null;
  selectedOrderModal: BoOrdiniLocaleId | null;
  searchFilterOrder: string;
  statusFilterOrder: string;
  listaGiorniDiChiusura: GiorniDiChiusura[];
  listaTagCategories: categorieRistorante[];
  listaIngredienti: IngredientiProdottiLocale[] | null;
  listaProdotti: ProdottiLocale[] | null;
  listaTipi: GetTipoProdottoResponse[] | null;
}

const initialState: backofficeState = {
  listaLocaliById: null,
  localeById: null,
  selectedOrderModal: null,
  searchFilterOrder: "",
  statusFilterOrder: ALLORDER,
  listaGiorniDiChiusura: [],
  listaTagCategories: [],
  listaIngredienti: null,
  listaProdotti: null,
  listaTipi: null,
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
    setListaTagCategories: (state, action: PayloadAction<categorieRistorante[]>) => {
      state.listaTagCategories = action.payload;
    },
    setListaIngredienti: (state, action: PayloadAction<IngredientiProdottiLocale[]>) => {
      state.listaIngredienti = action.payload;
    },
    setListaProdotti: (state, action: PayloadAction<ProdottiLocale[]>) => {
      state.listaProdotti = action.payload;
    },
    setListaTipi: (state, action: PayloadAction<GetTipoProdottoResponse[]>) => {
      state.listaTipi = action.payload;
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
  setListaTagCategories,
  setListaIngredienti,
  setListaProdotti,
  setListaTipi,
} = backofficeReducer.actions;
export default backofficeReducer.reducer;
