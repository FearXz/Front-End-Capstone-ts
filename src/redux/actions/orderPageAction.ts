import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { LocaleIdResponse } from "../../interfaces/interfaces";
import { setLocaleById } from "../reducers/searchRistoranteReducer";
import { setIsLoading } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";

export const fetchLocaleId = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${url}ristorante/localeId/${id}`);

    if (response.ok) {
      const data: LocaleIdResponse[] = await response.json();
      console.log(data[0]);

      dispatch(setLocaleById(data[0]));

      toast.success("Ristorante recuperato con successo");
    } else {
      toast.error("Errore nel recupero del ristorante");

      throw new Error("Errore nel recupero del ristorante");
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
  } finally {
    dispatch(setIsLoading(false));
  }
};
