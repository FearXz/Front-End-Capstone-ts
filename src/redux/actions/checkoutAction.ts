import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { CartOrderDto } from "../../interfaces/interfaces";
import { setSessionId } from "../reducers/orderReducer";

export const createSession = (order: CartOrderDto | null) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "checkout/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Sessione creata con successo");
      dispatch(setSessionId(data.sessionId));
    } else {
      toast.error("Errore nel recupero delle categorie");

      throw new Error("Errore nel recupero delle coordinate");
    }
  } catch (error) {
    toast.error("Errore nella creazione della sessione");
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
