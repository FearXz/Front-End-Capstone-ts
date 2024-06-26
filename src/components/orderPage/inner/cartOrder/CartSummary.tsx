import { useDispatch, useSelector } from "react-redux";
import { CartProduct, CoordinateSearch, LocaleIdResponse } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { clearCart } from "../../../../redux/reducers/persistedInfoReducer";
import { addDays, isAfter, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CartSummary() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const luogoConsegna: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const isChiuso: boolean = useSelector((state: RootState) => state.order.isChiuso);

  const dispatch: AppDispatch = useDispatch();
  const navigate: Function = useNavigate();

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (cart.length > 0) {
      let now = new Date();
      let selectedDate = selectedHour ? parse(selectedHour, "HH:mm", new Date()) : null;

      if (selectedDate && isAfter(now, selectedDate)) {
        selectedDate = addDays(selectedDate, 1);
      }

      if (!isChiuso && selectedHour && selectedDate && isAfter(selectedDate, now)) {
        if (locale && luogoConsegna) {
          navigate("/checkout");
        }
      } else {
        toast.error("Errore: inserisci un orario valido!");
      }
    } else {
      toast.error("Errore: inserisci almeno un prodotto nel carrello!");
    }
  }
  return (
    <div id="cart_summary" className="py-xxl-4 py-2">
      {cart && (
        <div>
          <div className="d-flex justify-content-between px-xxl-5 px-3 fs-5">
            <span className="fw-bold">Totale</span>
            <span className="cart-total fw-bold">
              €{" "}
              {cart
                .reduce((total, product) => total + (product.totale ? product.totale * product.quantita : 0), 0)
                .toFixed(2)}
            </span>
          </div>
          <div
            className="d-flex justify-content-between px-xxl-5 px-3 fs-5 pt-xxl-5 pt-3"
            style={
              isChiuso || locale?.giorniDiChiusura.some((giorno) => giorno.numeroGiorno === new Date().getDay())
                ? { filter: "grayscale(100%)", opacity: "0.5", pointerEvents: "none" }
                : {}
            }
          >
            <button
              className="btn btn-gray-500 button-border-gray rounded-0 text-white "
              onClick={() => dispatch(clearCart())}
            >
              SVUOTA
            </button>
            <button className="btn btn-leaf-500  rounded-0 button-border-success text-white" onClick={handleSubmit}>
              CONFERMA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSummary;
