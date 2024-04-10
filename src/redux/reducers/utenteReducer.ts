//slice reducer
import { createSlice } from "@reduxjs/toolkit";

interface utenteState {
  selectedOption: string;
}

const initialState: utenteState = {
  selectedOption: "profilo",
};

const utenteReducer = createSlice({
  name: "utenteReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setSelectedOption } = utenteReducer.actions;
export default utenteReducer.reducer;
