import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartOrderDto } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { setIsLoading } from "../../redux/reducers/stateReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createSession } from "../../redux/actions/checkoutAction";

const stripePromise = loadStripe(
  "pk_test_51OwoZDDVSoH1622rTfzqeYLrq9gPwqYQ69doGhv0t4Ur1QcG3obWiyk1Wu0c1ZJI0rr0EerTgAiWAzuqz5Oq12Wv00wPiYGWlg"
);

const CheckoutForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const sessionId: string | null = useSelector((state: RootState) => state.order.sessionId);
  const order: CartOrderDto | null = useSelector((state: RootState) => state.persist.cartOrder);
  const navigate: Function = useNavigate();

  async function handleCheckout(sessionId: string) {
    if (!sessionId) {
      toast.error("Errore: sessionId non disponibile");
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const stripe = await stripePromise;
      if (!stripe) {
        return;
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      toast.error("Errore nel checkout");
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  useEffect(() => {
    if (order) dispatch(createSession(order));
    else navigate("/");
  }, [order]);

  return (
    <div id="checkout">
      <button onClick={() => sessionId && handleCheckout(sessionId)}>Checkout</button>
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {order?.prodotti.map((item, index) => (
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
