import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { CoordinateSearch } from "../../../../interfaces/interfaces";
import { useState } from "react";
import MobileModal from "./MobileModal";

function MobileFilterCategory() {
  const indirizzo: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="block_find_restaurant d-lg-none d-block">
      <MobileModal show={show} handleShow={handleShow} handleClose={handleClose} />
      <Row>
        <Col className="col-10">
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
        </Col>
        <div className="col-2 d-flex justify-content-end">
          <button className="btn btn-outline-leaf-500 rounded-0 max-h-50 mt-3" role="button" onClick={handleShow}>
            <i className="bi bi-sliders2-vertical text-black "></i>
          </button>
        </div>
      </Row>
    </div>
  );
}

export default MobileFilterCategory;
