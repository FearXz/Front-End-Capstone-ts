import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
import { setListaCategorie, setListaRistoranti } from "../reducers/searchRistoranteReducer";
import { CategorieResponse, ListaRistorantiResponse } from "../../interfaces/interfaces";
import { url } from "../../functions/config";
import { haversineDistance } from "../../functions/functions";

export const searchLocaliAtCoordinate = (lat: string, lon: string) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${url}Ristorante/listaRistoranti`);

    if (response.ok) {
      const data: ListaRistorantiResponse[] = await response.json();
      console.log(data);

      // toast.success("coordinate trovate con successo");
      dispatch(setIsLoading(false));

      data.forEach((restaurant: ListaRistorantiResponse) => {
        restaurant.distanza = haversineDistance(
          parseFloat(lat),
          parseFloat(lon),
          parseFloat(restaurant.latitudine),
          parseFloat(restaurant.longitudine)
        );
      });

      dispatch(setListaRistoranti(data));
    } else {
      // toast.error("Errore nel recupero delle coordinate");
      throw new Error("Errore nel recupero delle coordinate");
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const fetchListaCategorie = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${url}ristorante/listaCategorie`);

    if (response.ok) {
      const data: CategorieResponse[] = await response.json();
      console.log(data);

      dispatch(setIsLoading(false));
      dispatch(setListaCategorie(data));

      toast.success("Lista categorie caricata con successo");
    } else {
      toast.error("Errore nel recupero delle categorie");

      throw new Error("Errore nel recupero delle coordinate");
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
  } finally {
    dispatch(setIsLoading(false));
  }
};
