//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProduct, ProdottiLocale } from "../../interfaces/interfaces";

interface OrderState {
  newProduct: CartProduct | null;
}

const initialState: OrderState = {
  newProduct: null,
};

const orderReducer = createSlice({
  name: "orderReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setNewProduct: (state, action: PayloadAction<ProdottiLocale | null>) => {
      if (!action.payload) {
        state.newProduct = null;
        return;
      }
      const p: ProdottiLocale = action.payload;
      const newProduct: CartProduct = {
        idProdotto: p.idProdottoRistorante,
        nomeProdotto: p.nomeProdotto,
        prezzoProdotto: p.prezzoProdotto,
        quantita: 1,
        uniqueId: `${p.idProdottoRistorante}-${Date.now()}`,
        ingredienti: [],
      };
      p.ingredienti?.forEach((ingrediente) =>
        newProduct.ingredienti?.push({
          idIngrediente: ingrediente.idIngrediente,
          nomeIngrediente: ingrediente.nomeIngrediente,
          prezzoIngrediente: ingrediente.prezzoIngrediente,
          quantita: 1,
          isExtra: false,
        })
      );

      state.newProduct = newProduct;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setNewProduct } = orderReducer.actions;
export default orderReducer.reducer;
