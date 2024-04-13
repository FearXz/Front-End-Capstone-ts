//slice reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginAziendaResponse, LoginResponse } from "../../interfaces/interfaces";

interface AuthState {
  loggedProfile: LoginResponse | null;
  loggedAzienda: LoginAziendaResponse | null;
}

const initialState: AuthState = {
  loggedProfile: null,
  loggedAzienda: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    // Azione definita nello slice
    setLoggedProfile: (state, action: PayloadAction<LoginResponse>) => {
      state.loggedAzienda = null;
      state.loggedProfile = action.payload;
    },
    setLoggedAzienda: (state, action: PayloadAction<LoginAziendaResponse>) => {
      state.loggedProfile = null;
      state.loggedAzienda = action.payload;
    },
    setLogout: (state) => {
      state.loggedProfile = null;
      state.loggedAzienda = null;
    },
  },
});

// Esporto solo l'azione definita nello slice
export const { setLoggedProfile, setLogout, setLoggedAzienda } = authReducer.actions;
export default authReducer.reducer;
