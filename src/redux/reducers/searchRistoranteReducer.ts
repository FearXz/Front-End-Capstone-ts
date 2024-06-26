//slice reducer
import { createSlice } from "@reduxjs/toolkit";
import { ListaRistorantiResponse, LocaleIdResponse, categorieRistorante } from "../../interfaces/interfaces";

interface SearchRistoranteState {
  listaRistoranti: ListaRistorantiResponse[] | null;
  listaCategorie: categorieRistorante[] | null;
  filtroSearchBar: string;
  filtroCheckBox: number[]; // Array di idCategorie selezionate
  filtroRange: number; // Distanza in km
  localeById: LocaleIdResponse | null;
}

const initialState: SearchRistoranteState = {
  listaRistoranti: null,
  listaCategorie: null,
  filtroSearchBar: "",
  filtroCheckBox: [],
  filtroRange: 10,
  localeById: null,
};

const searchRistoranteReducer = createSlice({
  name: "searchRistoranteReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setListaRistoranti: (state, action) => {
      state.listaRistoranti = action.payload;
    },
    setListaCategorie: (state, action) => {
      state.listaCategorie = action.payload;
    },
    setLocaleById: (state, action) => {
      state.localeById = action.payload;
    },
    setFiltroSearchBar: (state, action) => {
      state.filtroSearchBar = action.payload;
    },
    addToFiltroCheckBox: (state, action) => {
      state.filtroCheckBox = [...state.filtroCheckBox, action.payload];
    },
    removeFromFiltroCheckBox: (state, action) => {
      state.filtroCheckBox = state.filtroCheckBox.filter((id) => id !== action.payload);
    },
    setFiltroCheckBox: (state, action) => {
      state.filtroCheckBox = action.payload;
    },
    setFiltroRange: (state, action) => {
      state.filtroRange = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const {
  setListaRistoranti,
  setListaCategorie,
  setFiltroSearchBar,
  addToFiltroCheckBox,
  removeFromFiltroCheckBox,
  setFiltroRange,
  setLocaleById,
  setFiltroCheckBox,
} = searchRistoranteReducer.actions;
export default searchRistoranteReducer.reducer;
