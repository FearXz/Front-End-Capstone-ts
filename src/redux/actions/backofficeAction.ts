import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading, toggleRefresh } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { setListaLocaliById, setLocaleById } from "../reducers/backofficeReducer";
import { GetBoLocaleIdResponse, GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";
import { NavigateFunction } from "react-router-dom";

export const getListaRistorantiById = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getristorantibyidazienda");
    if (response.ok) {
      const data: GetRistorantiByIdAziendaResponse[] = await response.json();
      dispatch(setListaLocaliById(data));
      console.log(data);

      toast.success("Dati Ristoranti  ottenuti con successo");
    } else {
      throw new Error("Errore nel recupero dei ristoranti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei ristoranti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getRistorantiById = (id: number, navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getristorantebyid/" + id);
    if (response.ok) {
      const data: GetBoLocaleIdResponse[] = await response.json();
      dispatch(setLocaleById(data[0]));
      console.log(data[0]);
      if (!data[0]) {
        navigate("/backoffice");
      }

      toast.success("Dati Ristoranti  ottenuti con successo");
    } else {
      throw new Error("Errore nel recupero dei ristoranti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei ristoranti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const confirmEvaso = (idOrder: number, idRistorante: number | null) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/confirmevaso", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idOrder, idRistorante }),
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

/* export const updateAzienda = (userData: AziendaProfileDto) => async (dispatch: AppDispatch) => {
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
};*/
