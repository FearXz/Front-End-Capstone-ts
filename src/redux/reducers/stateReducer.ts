//slice reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
  isLoading: false,
};

const stateReducer = createSlice({
  name: "stateReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    toggleRefresh: (state, action) => {
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
