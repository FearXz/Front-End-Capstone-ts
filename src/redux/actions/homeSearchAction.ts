import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
import { url } from "../../functions/config";
import { setListaRistoranti } from "../reducers/searchRistoranteReducer";
import { haversineDistance } from "../../functions/functions";

export const searchHomeAddress = (address: string, navigate: any) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const { lat, lon } = data[0];
      toast.success("coordinate trovate con successo");
      dispatch(setIsLoading(false));
      navigate(`/locali?lat=${lat}&lon=${lon}`);
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
export const searchLocaliAtCoordinate = (lat: number, lon: number) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`${url}Ristorante/listaRistoranti`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // toast.success("coordinate trovate con successo");
      dispatch(setIsLoading(false));

      data.forEach((restaurant: any) => {
        restaurant.distanza = haversineDistance(
          lat,
          lon,
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
