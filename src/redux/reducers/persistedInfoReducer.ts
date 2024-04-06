//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProduct, CoordinateSearch } from "../../interfaces/interfaces";
import { add } from "date-fns";

interface persistedInfoState {
  indirizzoCercato: CoordinateSearch | null;
  cart: CartProduct[];
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
    setIndirizzoCercato: (state, action: PayloadAction<CoordinateSearch | null>) => {
      state.indirizzoCercato = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const addedProduct: CartProduct = action.payload;

      const index = state.cart.findIndex(
        (cartProduct: CartProduct) =>
          cartProduct.idProdotto === addedProduct.idProdotto &&
          cartProduct.ingredienti.length === addedProduct.ingredienti.length &&
          cartProduct.ingredienti.every((cartIng) =>
            addedProduct.ingredienti.some(
              (addedIng) =>
                addedIng.idIngrediente === cartIng.idIngrediente &&
                addedIng.quantita === cartIng.quantita &&
                addedIng.isExtra === cartIng.isExtra
            )
          )
      );

      if (index !== -1) {
        // Se il prodotto esiste, aumenta la sua quantità di 1
        state.cart[index].quantita += 1;
      } else {
        // Altrimenti, aggiungi un nuovo prodotto al carrello
        state.cart = [...state.cart, addedProduct];
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      state.cart = state.cart.filter((item: CartProduct) => item.idProdotto !== action.payload.idProdotto);
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setIndirizzoCercato, addToCart, removeFromCart } = persistedInfoReducer.actions;
export default persistedInfoReducer.reducer;
