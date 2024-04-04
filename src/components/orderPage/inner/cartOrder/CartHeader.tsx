import { useSelector } from "react-redux";
import { CoordinateSearch } from "../../../../interfaces/interfaces";
import { RootState } from "../../../../redux/store/store";
import MultiSelectOrderHour from "./MultiSelectOrderHour";

function CartHeader() {
  const luogoConsegna: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);

  return (
    <div id="cart-header" className="text-center pt-xl-4 pt-3">
      <h3 className=" font-breef h3 mb-0">Il tuo ordine</h3>
      <div id="cart-address-delivery">
        Consegna in <span>{luogoConsegna && luogoConsegna.display_name}</span>
        <span className="d-block"></span>
      </div>
      <MultiSelectOrderHour />
    </div>
  );
}

export default CartHeader;
