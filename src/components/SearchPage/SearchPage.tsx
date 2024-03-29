import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchLocaliAtCoordinate } from "../../redux/actions/homeSearchAction";
import { useQuery } from "../../functions/functions";

function SearchPage() {
  const params = useQuery();
  const dispatch: any = useDispatch();
  // ho lat e lon come parametri
  console.log(params);
  const lat: string | null = params.get("lat");
  const lon: string | null = params.get("lon");

  useEffect(() => {
    // Qui puoi fare il fetch per i ristoranti vicini
    dispatch(searchLocaliAtCoordinate(lat || "", lon || ""));
  }, []);

  return <div>SearchPage</div>;
}

export default SearchPage;
