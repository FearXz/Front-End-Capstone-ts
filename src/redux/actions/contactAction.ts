import { setIsLoading } from "../reducers/stateReducer";
import { AppDispatch } from "../store/store";
import { toast } from "react-toastify";
import { EmailDto } from "../../interfaces/interfaces";
import { url } from "../../functions/config";

export const contactPost = (emailDto: EmailDto) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(url + "auth/contactemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailDto),
    });

    if (response.ok) {
      toast.success("Email inviata con successo");
    } else {
      throw new Error("Errore nell'invio dell'email");
    }
  } catch (error) {
    // You can handle errors here, if necessary
    toast.error("Errore nell'invio dell'email");
  } finally {
    dispatch(setIsLoading(false));
  }
};
