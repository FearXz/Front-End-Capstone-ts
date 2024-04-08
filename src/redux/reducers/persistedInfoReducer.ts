//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartOrderDto, CartProduct, CoordinateSearch } from "../../interfaces/interfaces";

interface persistedInfoState {
  indirizzoCercato: CoordinateSearch | null;
  cart: CartProduct[];
  selectedHour: string | null;
  cartOrder: CartOrderDto | null;
}

const initialState: persistedInfoState = {
  indirizzoCercato: null,
  cart: [],
  selectedHour: null,
  cartOrder: null,
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
      state.cart = state.cart.filter((item: CartProduct) => item.uniqueId !== action.payload.uniqueId);
    },
    plusQuantityProduct: (state, action: PayloadAction<CartProduct>) => {
      const index: number = state.cart.findIndex(
        (cartProduct: CartProduct) => cartProduct.uniqueId === action.payload.uniqueId
      );
      if (index !== -1) {
        state.cart[index].quantita += 1;
      }
    },
    minusQuantityProduct: (state, action: PayloadAction<CartProduct>) => {
      const index: number = state.cart.findIndex(
        (cartProduct: CartProduct) => cartProduct.uniqueId === action.payload.uniqueId
      );
      if (index !== -1) {
        if (state.cart[index].quantita > 1) {
          state.cart[index].quantita -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setSelectedHour: (state, action: PayloadAction<string | null>) => {
      state.selectedHour = action.payload;
    },
    setCartOrder: (state, action: PayloadAction<CartOrderDto | null>) => {
      state.cartOrder = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const {
  setIndirizzoCercato,
  addToCart,
  removeFromCart,
  plusQuantityProduct,
  minusQuantityProduct,
  clearCart,
  setSelectedHour,
  setCartOrder,
} = persistedInfoReducer.actions;
export default persistedInfoReducer.reducer;
