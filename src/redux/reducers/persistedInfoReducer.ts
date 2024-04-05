//slice reducer
import { createSlice } from "@reduxjs/toolkit";
import { CoordinateSearch } from "../../interfaces/interfaces";

interface persistedInfoState {
  indirizzoCercato: CoordinateSearch | null;
  cart: any;
}

const initialState: persistedInfoState = {
  indirizzoCercato: null,
  cart: [],
};

const persistedInfoReducer = createSlice({
  name: "persistedInfoReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setIndirizzoCercato: (state, action) => {
      state.indirizzoCercato = action.payload;
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      state.cart = [...state.cart, action.payload];
      console.log(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setIndirizzoCercato, addToCart, removeFromCart } = persistedInfoReducer.actions;
export default persistedInfoReducer.reducer;
