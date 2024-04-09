//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateState {
  refresh: boolean;
  isLoading: boolean;
  isLoadingCounter: number;
  paymentStatus: boolean;
}

const initialState: StateState = {
  refresh: false,
  isLoading: false,
  isLoadingCounter: 0,
  paymentStatus: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setPaymentStatus: (state, action: PayloadAction<boolean>) => {
      state.paymentStatus = action.payload;
    },
    setIsLoading: (state, action) => {
      //  incrementato di 1 ogni volta che viene chiamata l'azione setIsLoading con action.payload = true
      // e decrementato di 1 ogni volta che viene chiamata l'azione setIsLoading con action.payload = false
      // in modo da poter gestire il loading di più componenti

      if (action.payload == true) {
        state.isLoadingCounter = state.isLoadingCounter + 1;
        console.log(state.isLoadingCounter);
      } else {
        if (state.isLoadingCounter > 0) {
          state.isLoadingCounter = state.isLoadingCounter - 1;
          console.log(state.isLoadingCounter);
        }
      }
      // se isLoadingCounter è > 0 allora isLoading è true
      state.isLoading = state.isLoadingCounter > 0;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { toggleRefresh, setIsLoading, setPaymentStatus } = stateReducer.actions;
export default stateReducer.reducer;
