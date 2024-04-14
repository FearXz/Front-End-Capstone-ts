import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { AziendaData, AziendaProfileDto } from "../../interfaces/interfaces";
import { setMyProfileAzienda } from "../reducers/aziendaReducer";

export const updateAzienda = (userData: AziendaProfileDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "azienda/updateazienda", {
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

export const getAzienda = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "azienda/getazienda");
    if (response.ok) {
      const data: AziendaData = await response.json();
      dispatch(setMyProfileAzienda(data));
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

/* export const confirmOrder = (idOrder: number) => async (dispatch: AppDispatch) => {
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
}; */
