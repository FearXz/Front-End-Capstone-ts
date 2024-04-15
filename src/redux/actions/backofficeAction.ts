import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { setListaLocaliById } from "../reducers/backofficeReducer";
import { GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";

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
