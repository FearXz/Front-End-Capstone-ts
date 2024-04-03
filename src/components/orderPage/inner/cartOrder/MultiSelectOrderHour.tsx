function MultiSelectOrderHour() {
  return (
    <div className="cart-requested-for p-3">
      <div className="form-floating">
        <select
          className="form-select rounded-0 focus"
          id="requestedForSelect"
          aria-label="Scegli l'orario"
          name="requested_for"
        >
          <option value="21:30">21:30 - 21:40&nbsp;(Mercoledì)</option>
          <option value="21:40">21:40 - 21:50&nbsp;(Mercoledì)</option>
          <option value="21:50">21:50 - 22:00&nbsp;(Mercoledì)</option>
          <option value="22:00">22:00 - 22:10&nbsp;(Mercoledì)</option>
        </select>
        <label typeof="floatingSelect">Scegli l'orario</label>
      </div>
    </div>
  );
}

export default MultiSelectOrderHour;
