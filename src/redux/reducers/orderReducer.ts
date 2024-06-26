//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartIngredient, CartProduct, IngredientiProdottiLocale, ProdottiLocale } from "../../interfaces/interfaces";

interface OrderState {
  newProduct: CartProduct | null;
  sessionId: string | null;
  isChiuso: boolean;
}

const initialState: OrderState = {
  newProduct: null,
  sessionId: null,
  isChiuso: false,
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
    plusQuantityNewProduct: (state) => {
      if (state.newProduct === null) {
        return;
      }
      state.newProduct.quantita += 1;
    },
    minusQuantityNewProduct: (state) => {
      if (state.newProduct === null) {
        return;
      }
      if (state.newProduct.quantita === 1) {
        return;
      }

      state.newProduct.quantita -= 1;
    },
    addExtraIngredient: (state, action: PayloadAction<IngredientiProdottiLocale>) => {
      if (state.newProduct === null) {
        return;
      }

      const ingredienteExtra: IngredientiProdottiLocale = action.payload;
      const extraIndex: number = state.newProduct?.ingredienti.findIndex(
        (ingrediente: CartIngredient) =>
          ingrediente.idIngrediente === ingredienteExtra.idIngrediente && ingrediente.isExtra
      );

      if (extraIndex !== -1) {
        state.newProduct.ingredienti[extraIndex].quantita += 1;
      } else {
        const extraCartIngredient: CartIngredient = {
          idIngrediente: action.payload.idIngrediente,
          nomeIngrediente: action.payload.nomeIngrediente,
          prezzoIngrediente: action.payload.prezzoIngrediente,
          quantita: 1,
          isExtra: true,
        };
        state.newProduct.ingredienti = [...state.newProduct.ingredienti, { ...extraCartIngredient }];
      }
    },
    removeExtraIngredient: (state, action: PayloadAction<IngredientiProdottiLocale>) => {
      if (state.newProduct === null) {
        return;
      }
      const ingredienteExtra = action.payload;
      const extraIndex = state.newProduct?.ingredienti.findIndex(
        (ingrediente) => ingrediente.idIngrediente === ingredienteExtra.idIngrediente && ingrediente.isExtra
      );

      if (extraIndex !== -1) {
        if (state.newProduct.ingredienti[extraIndex].quantita === 1) {
          state.newProduct.ingredienti = state.newProduct.ingredienti.filter(
            (ingrediente) => !(ingrediente.idIngrediente === ingredienteExtra.idIngrediente && ingrediente.isExtra)
          );
        } else {
          state.newProduct.ingredienti[extraIndex].quantita -= 1;
        }
      }
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
    toggleIngredient: (state, action: PayloadAction<IngredientiProdottiLocale>) => {
      if (state.newProduct === null) {
        return;
      }

      const ingrediente: IngredientiProdottiLocale = action.payload;
      const index: number = state.newProduct?.ingredienti.findIndex(
        (cartIngredient: CartIngredient) =>
          cartIngredient.idIngrediente === ingrediente.idIngrediente && !cartIngredient.isExtra
      );

      if (index !== -1) {
        state.newProduct.ingredienti[index].quantita = state.newProduct.ingredienti[index].quantita === 0 ? 1 : 0;
      }
    },
    setIsChiuso: (state, action: PayloadAction<boolean>) => {
      state.isChiuso = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const {
  setNewProduct,
  addExtraIngredient,
  removeExtraIngredient,
  toggleIngredient,
  setSessionId,
  plusQuantityNewProduct,
  minusQuantityNewProduct,
  setIsChiuso,
} = orderReducer.actions;
export default orderReducer.reducer;
