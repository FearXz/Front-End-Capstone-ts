import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
import { setListaCategorie, setListaRistoranti } from "../reducers/searchRistoranteReducer";
import { CoordinateSearch, ListaRistorantiResponse, categorieRistorante } from "../../interfaces/interfaces";
import { url } from "../../functions/config";
import { haversineDistance } from "../../functions/functions";
import { setIndirizzoCercato } from "../reducers/persistedInfoReducer";
import { AppDispatch } from "../store/store";

export const searchHomeAddress = (address: string, navigate: Function) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);

    if (response.ok) {
      const data: CoordinateSearch[] = await response.json();

      console.log(data);

      if (data.length === 0) {
        toast.error("Nessun indirizzo trovato");
        dispatch(setIndirizzoCercato(null));
        navigate("/");
      }

      const filteredData: CoordinateSearch = {
        lat: data[0].lat,
        lon: data[0].lon,
        display_name: data[0].display_name,
      };

      dispatch(setIndirizzoCercato(filteredData));
      dispatch(searchLocaliAtCoordinate(filteredData.lat.toString(), filteredData.lon.toString()));
      toast.success("coordinate trovate con successo");
    } else {
      toast.error("Errore nel recupero delle coordinate");
      throw new Error("Errore nel recupero delle coordinate");
    }
  } catch (error) {
    // Puoi gestire gli errori qui, se necessario
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const searchLocaliAtCoordinate = (lat: string, lon: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));

    const response = await fetch(`${url}Ristorante/listaRistoranti`);

    if (response.ok) {
      const data: ListaRistorantiResponse[] = await response.json();
      console.log(data);

      if (data.length === 0) {
        toast.error("Nessun ristorante trovato");
        throw new Error("Nessun ristorante trovato");
      }

      data.forEach((restaurant: ListaRistorantiResponse) => {
        restaurant.distanza = haversineDistance(
          parseFloat(lat),
          parseFloat(lon),
          parseFloat(restaurant.latitudine),
          parseFloat(restaurant.longitudine)
        );
      });
      // ordina i ristoranti per distanza
      data.sort((a, b) => a.distanza - b.distanza);

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
export const fetchListaCategorie = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${url}ristorante/listaCategorie`);

    if (response.ok) {
      const data: categorieRistorante[] = await response.json();
      console.log(data);

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
