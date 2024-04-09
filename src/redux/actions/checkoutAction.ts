import { toast } from "react-toastify";
import { url } from "../../functions/config";
import { fetchWithAuth } from "../../functions/interceptor";
import { setIsLoading, setPaymentStatus } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { CartOrderDto } from "../../interfaces/interfaces";
import { setSessionId } from "../reducers/orderReducer";
import { loadStripe } from "@stripe/stripe-js";
import { clearCart, setIndirizzoCercato, setSelectedHour } from "../reducers/persistedInfoReducer";

const stripePromise = loadStripe(
  "pk_test_51OwoZDDVSoH1622rTfzqeYLrq9gPwqYQ69doGhv0t4Ur1QcG3obWiyk1Wu0c1ZJI0rr0EerTgAiWAzuqz5Oq12Wv00wPiYGWlg"
);

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

      try {
        dispatch(setIsLoading(true));
        const stripe = await stripePromise;
        if (!stripe) {
          return;
        }
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (error) {
          console.error(error);
        }
      } catch (error) {
        toast.error("Errore nel checkout");
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
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

export const VerifySession = (sessionId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetchWithAuth(url + "checkout/verify-session/" + sessionId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Pagamento effettuato con successo");
      dispatch(setPaymentStatus(true));
      dispatch(clearCart());
      dispatch(setSelectedHour(null));
      dispatch(setIndirizzoCercato(null));
    } else {
      dispatch(setPaymentStatus(false));
      throw new Error("Errore nel verificare la sessione di pagamento");
    }
  } catch (error) {
    toast.error(" Errore nel verificare la sessione di pagamento");
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
