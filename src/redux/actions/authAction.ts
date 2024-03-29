import { setLoggedProfile } from "../reducers/authReducer";
import { url } from "../../functions/config";
import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
// auth/login endpoint
export const loginPost = (loginObj, navigate: any) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(url + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });

    if (response.ok) {
      const dataProfile = await response.json();
      console.log(dataProfile);

      dispatch(setLoggedProfile(dataProfile));
      toast.success("Login effettuato con successo");
      dispatch(setIsLoading(false));

      navigate("/");
    } else {
      throw new Error("Errore nel recupero dei risultati");
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
    toast.error("Errore nel login");
    console.error("Errore nel fetch:", error.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};
// auth/register endpoint
export const registerPost = (registerObj, navigate) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(url + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerObj),
    });

    if (response.ok) {
      toast.success("Registrazione effettuata con successo");

      const loginObj = {
        email: registerObj.email,
        password: registerObj.password,
      };

      dispatch(loginPost(loginObj, navigate));
      dispatch(setIsLoading(false));
      navigate("/");
    } else {
      if (response.status === 409) {
        toast.error("Email già registrata");
      } else {
        toast.error("Errore nel registrazione");
        throw new Error("Errore nel recupero dei risultati");
      }
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
    toast.error("Errore nel registrazione");
    console.error("Errore nel fetch:", error.message);
  } finally {
    dispatch(setIsLoading(false));
  }
};
