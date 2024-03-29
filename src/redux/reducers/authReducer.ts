//slice reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedProfile: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setLoggedProfile: (state, action) => {
      state.loggedProfile = action.payload;
    },
    setLogout: (state) => {
      state.loggedProfile = null;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setLoggedProfile, setLogout } = authReducer.actions;
export default authReducer.reducer;
