import { Form } from "react-bootstrap";

function MobileFilterCategory() {
  return (
    <div className="block_find_restaurant d-lg-none d-block">
      <div className="row">
        <div className="col-10">
          <span className="find_restaurant_address text-leaf-500 fw-bold ">Via Salvador Allende,&nbsp;1</span>
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
          <i className="far fa-sliders-v"></i>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterCategory;
