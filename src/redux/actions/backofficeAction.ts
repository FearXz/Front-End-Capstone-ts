import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading, toggleRefresh } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { setListaGiorniDiChiusura, setListaLocaliById, setLocaleById } from "../reducers/backofficeReducer";
import {
  GetBoLocaleIdResponse,
  GetRistorantiByIdAziendaResponse,
  GiorniDiChiusura,
  GiorniDiChiusuraDto,
  LocalMainModalEditDto,
} from "../../interfaces/interfaces";
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
export const getGiorniDiChiusura = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/getgiornidichiusura/");
    if (response.ok) {
      const data: GiorniDiChiusura[] = await response.json();
      dispatch(setListaGiorniDiChiusura(data));

      console.log(data);
    } else {
      throw new Error("Errore nel recupero dei giorni di chiusura");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei giorni di chiusura");
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
    } else {
      throw new Error("Errore nel recupero dei ristoranti");
    }
  } catch (error) {
    toast.error("Errore nel recupero dei ristoranti");
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const putGiorniChiusura = (newDayOff: GiorniDiChiusuraDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/putgiornichiusura", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDayOff),
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
export const localeditmainmodal = (editObj: LocalMainModalEditDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "backoffice/localeditmainmodal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editObj),
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
