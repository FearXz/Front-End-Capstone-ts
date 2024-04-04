import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { CoordinateSearch } from "../../../../interfaces/interfaces";

function MobileFilterCategory() {
  const indirizzo: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);

  return (
    <div className="block_find_restaurant d-lg-none d-block">
      <div className="row">
        <div className="col-10">
          <span className="find_restaurant_address text-leaf-500 fw-bold ">{indirizzo?.display_name}</span>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="rounded-0   my-input"
              type="text"
              placeholder="Cerca il tuo locale preferito"
              value={""}
              onChange={() => {}}
            />
          </Form.Group>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <button className="btn btn-outline-leaf-500 rounded-0 max-h-50 mt-3" role="button">
            <i className="bi bi-sliders2-vertical text-black "></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterCategory;
