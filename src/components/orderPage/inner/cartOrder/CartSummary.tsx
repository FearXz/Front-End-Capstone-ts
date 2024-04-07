import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { clearCart } from "../../../../redux/reducers/persistedInfoReducer";

function CartSummary() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const dispatch: AppDispatch = useDispatch();

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
          <div className="d-flex justify-content-between px-xxl-5 px-3 fs-5 pt-xxl-5 pt-3">
            <button
              className="btn btn-gray-500 button-border-gray rounded-0 text-white "
              onClick={() => dispatch(clearCart())}
            >
              SVUOTA
            </button>
            <button className="btn btn-leaf-500  rounded-0 button-border-success text-white">CONFERMA</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSummary;
