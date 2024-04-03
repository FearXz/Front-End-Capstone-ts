function CartSummary() {
  return (
    <div id="cart_summary" className="py-xxl-4 py-2">
      <div className="d-flex justify-content-between px-xxl-5 px-3 fs-5">
        <span className="fw-bold">Totale</span>
        <span className="cart-total fw-bold">€ 0,00</span>
      </div>
      <div className="d-flex justify-content-between px-xxl-5 px-3 fs-5 pt-xxl-5 pt-3">
        <button className="btn btn-gray-500 button-border-gray rounded-0 text-white " type="button">
          SVUOTA
        </button>
        <button className="btn btn-leaf-500  rounded-0 button-border-success text-white" type="submit">
          CONFERMA
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
