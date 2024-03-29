function MobileFilterCategory() {
  return (
    <div className="block_find_restaurant d-lg-none d-block">
      <div className="row">
        <div className="col-10">
          Consegna in{" "}
          <span className="find_restaurant_address text-leaf-500 fw-bold ">Via Salvador Allende,&nbsp;1</span>
          <button className="btn btn-leaf-500 btn-modify-address">
            <i className="fas fa-edit"></i>
          </button>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button
            className="btn btn-outline-leaf-500"
            data-bs-toggle="modal"
            // href="#restaurants-filters-modal"
            role="button"
          >
            <i className="far fa-sliders-v"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterCategory;
