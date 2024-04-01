import { setLoggedProfile } from "../reducers/authReducer";
import { url } from "../../functions/config";
import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
import { LoginDto, LoginResponse, RegisterDto } from "../../interfaces/interfaces";
import { AppDispatch } from "../store/store";
// auth/login endpoint
export const loginPost = (loginObj: LoginDto, navigate: Function) => async (dispatch: AppDispatch) => {
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
      const dataProfile: LoginResponse = await response.json();
      console.log(dataProfile);

      dispatch(setLoggedProfile(dataProfile));
      toast.success("Login effettuato con successo");

      navigate("/");
    } else {
      throw new Error("Errore nel recupero dei risultati");
    }
  } catch (error) {
    // You can handle errors here, if necessary
    toast.error("Errore nel login");
  } finally {
    dispatch(setIsLoading(false));
  }
};
// auth/register endpoint
export const registerPost = (registerObj: RegisterDto, navigate: Function) => async (dispatch: AppDispatch) => {
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

      const loginObj: LoginDto = {
        email: registerObj.email,
        password: registerObj.password,
      };

      dispatch(loginPost(loginObj, navigate));
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
  } finally {
    dispatch(setIsLoading(false));
  }
};
