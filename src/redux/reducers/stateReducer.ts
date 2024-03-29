//slice reducer
import { createSlice } from "@reduxjs/toolkit";

interface StateState {
  refresh: boolean;
  isLoading: boolean;
}

const initialState: StateState = {
  refresh: false,
  isLoading: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { toggleRefresh, setIsLoading } = stateReducer.actions;
export default stateReducer.reducer;
