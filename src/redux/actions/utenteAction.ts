import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading, toggleRefresh } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { GetUtenteResponse, UtenteProfileDto } from "../../interfaces/interfaces";
import { setMyProfile } from "../reducers/utenteReducer";

export const updateutente = (userData: UtenteProfileDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "utente/updateutente", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      toast.success("Dati Profilo utente modificati con successo");
    } else {
      throw new Error("Errore nella modifica dei dati utente");
    }
  } catch (error) {
    toast.error("Errore nella modifica dei dati utente");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getUtente = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "utente/getutente");
    if (response.ok) {
      const data: GetUtenteResponse = await response.json();
      dispatch(setMyProfile(data));
      console.log(data);

      toast.success("Dati Profilo utente ottenuti con successo");
    } else {
      throw new Error("Errore nel recupero dei dati utente");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei dati utente");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const confirmOrder = (idOrder: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "utente/confirmOrder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idOrder),
    });

    if (response.ok) {
      dispatch(toggleRefresh());
      toast.success("Ordine confermato con successo");
    } else {
      throw new Error("Errore nella conferma dell'ordine");
    }
  } catch (error) {
    toast.error("Errore nella conferma dell'ordine");
  } finally {
    dispatch(setIsLoading(false));
  }
};
