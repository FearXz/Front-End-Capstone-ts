import { useEffect } from "react";
import { CartProduct, CoordinateSearch } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import CheckoutHeader from "./inner/CheckoutHeader";
import CheckoutDetails from "./inner/CheckoutDetails";

const CheckoutForm = () => {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const locale = useSelector((state: RootState) => state.persist.restaurantId);
  const luogoConsegna: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const navigate: Function = useNavigate();

  useEffect(() => {
    if (cart.length > 0 && locale && luogoConsegna && selectedHour) {
    } else navigate("/");
  }, [cart, locale, luogoConsegna, selectedHour]);

  return (
    <main>
      <CheckoutHeader />
      <CheckoutDetails />
    </main>
  );
};

export default CheckoutForm;
