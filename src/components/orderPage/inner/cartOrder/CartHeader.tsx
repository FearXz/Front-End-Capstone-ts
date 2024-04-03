import MultiSelectOrderHour from "./MultiSelectOrderHour";

function CartHeader() {
  return (
    <div id="cart-header" className="text-center pt-xl-4 pt-3">
      <h3 className=" font-breef h3 mb-0">Il tuo ordine</h3>
      <div id="cart-address-delivery">
        Consegna in{" "}
        <span>
          Via Enrico Fermi, 10, San Giovanni in Marignano
          <button className="btn btn-link btn-action btn-modify-address py-0 ps-1 pe-0" type="button">
            <i className="fa fa-pencil text-white"></i>
          </button>
        </span>
        <span className="d-block"></span>
      </div>
      <MultiSelectOrderHour />
    </div>
  );
}

export default CartHeader;
