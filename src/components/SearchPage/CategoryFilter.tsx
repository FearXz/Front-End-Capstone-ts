function CategoryFilter() {
  return (
    <div id="filter">
      <div className="border-bottom py-3">
        <h4 className="h5 text-uppercase fw-bold">CATEGORIE</h4>
        <div
          id="search-filters-categories"
          className="filters_categories"
          style={{ overflow: "auto", maxHeight: "1000px" }}
        >
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="types" value="american" id="types_american" />
            <label className="form-check-label" typeof="types_american">
              Americano{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
