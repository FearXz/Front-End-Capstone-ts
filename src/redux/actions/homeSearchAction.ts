import { toast } from "react-toastify";
import { setIsLoading } from "../reducers/stateReducer";
import { CoordinateSearch } from "../../interfaces/interfaces";
import { setIndirizzoCercato } from "../reducers/persistedInfoReducer";

export const searchHomeAddress = (address: string, navigate: any) => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);

    if (response.ok) {
      const data: CoordinateSearch[] = await response.json();

      console.log(data);

      const filteredData: CoordinateSearch = {
        lat: data[0].lat,
        lon: data[0].lon,
        display_name: data[0].display_name,
      };

      dispatch(setIndirizzoCercato(filteredData));
      toast.success("coordinate trovate con successo");
      dispatch(setIsLoading(false));
      navigate(`/locali?lat=${filteredData.lat}&lon=${filteredData.lon}`);
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
