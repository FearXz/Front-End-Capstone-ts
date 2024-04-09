import { useEffect } from "react";
import { CartOrderDto, CartProduct, CoordinateSearch } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

import { useNavigate } from "react-router-dom";
import { createSession } from "../../redux/actions/checkoutAction";

const CheckoutForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const localeId = useSelector((state: RootState) => state.persist.restaurantId);
  const luogoConsegna: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const navigate: Function = useNavigate();

  async function handleCheckout() {
    const cartOrderDto: CartOrderDto = {
      idRistorante: localeId ? localeId : 0,
      indirizzoDiConsegna: luogoConsegna ? luogoConsegna.display_name : "",
      orarioConsegnaPrevista: selectedHour ? selectedHour : "",
      note: "asdasdasd",
      totale: cart.reduce((total, product) => total + (product.totale ? product.totale * product.quantita : 0), 0),
      prodotti: cart,
    };
    console.log(cartOrderDto);
    dispatch(createSession(cartOrderDto));
  }

  useEffect(() => {
    if (cart.length > 0 && localeId && luogoConsegna && selectedHour) {
    } else navigate("/");
  }, [cart, localeId, luogoConsegna, selectedHour]);

  return (
    <div id="checkout">
      <button onClick={() => handleCheckout()}>Checkout</button>
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cart?.map((item, index) => (
            <li key={index}>
              {item.nomeProdotto} - {item.totale && item.totale.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutForm;
