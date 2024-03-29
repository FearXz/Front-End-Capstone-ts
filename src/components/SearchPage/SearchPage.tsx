import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchLocaliAtCoordinate } from "../../redux/actions/homeSearchAction";
import { useQuery } from "../../functions/functions";

function SearchPage() {
  const params = useQuery();
  const dispatch = useDispatch();
  // ho lat e lon come parametri
  console.log(params);
  const lat = params.get("lat");
  const lon = params.get("lon");

  useEffect(() => {
    // Qui puoi fare il fetch per i ristoranti vicini
    dispatch(searchLocaliAtCoordinate(lat, lon));
  }, []);

  return <div>SearchPage</div>;
}

export default SearchPage;
