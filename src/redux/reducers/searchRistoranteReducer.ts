//slice reducer
import { createSlice } from "@reduxjs/toolkit";
import { CategorieResponse, ListaRistorantiResponse } from "../../interfaces/interfaces";

interface SearchRistoranteState {
  listaRistoranti: ListaRistorantiResponse[] | null;
  listaCategorie: CategorieResponse[] | null;
  filtroSearchBar: string;
}

const initialState: SearchRistoranteState = {
  listaRistoranti: null,
  listaCategorie: null,
  filtroSearchBar: "",
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
    setFiltroSearchBar: (state, action) => {
      state.filtroSearchBar = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setListaRistoranti, setListaCategorie, setFiltroSearchBar } = searchRistoranteReducer.actions;
export default searchRistoranteReducer.reducer;
