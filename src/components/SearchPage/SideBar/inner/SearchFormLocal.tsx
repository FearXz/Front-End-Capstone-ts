import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { setFiltroRange, setFiltroSearchBar } from "../../../../redux/reducers/searchRistoranteReducer";

function SearchFormLocal() {
  const dispatch: AppDispatch = useDispatch();
  const indirizzoCercato = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const filtroSearchBar = useSelector((state: RootState) => state.searchRistorante.filtroSearchBar);
  const filtroRange = useSelector((state: RootState) => state.searchRistorante.filtroRange);

  return (
    <div>
      <p className="text-leaf-500 fw-bold ">{indirizzoCercato ? indirizzoCercato.display_name : ""}</p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          className="rounded-0 fix-h-50  my-input focus"
          type="text"
          placeholder="Cerca il tuo locale preferito"
          value={filtroSearchBar}
          onChange={(e) => dispatch(setFiltroSearchBar(e.target.value))}
        />
        <h4 className="h5 text-uppercase fw-bold mt-3">DISTANZA</h4>
      </Form.Group>
      <Row className="flex-nowrap">
        <Col className="col-auto p-0 ps-3">1</Col>
        <Col className="">
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={filtroRange}
            onChange={(e) => dispatch(setFiltroRange(e.currentTarget.value))}
            className=" w-100"
            style={{ background: "#4CAF50" }}
            id="filtroRange"
          />{" "}
        </Col>
        <Col className="col-auto p-0 pe-3" style={{ minWidth: "62px" }}>
          {filtroRange} km
        </Col>
      </Row>
    </div>
  );
}

export default SearchFormLocal;
