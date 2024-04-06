import { Accordion, Button, Col, Modal, Row } from "react-bootstrap";
import { CartProduct, IngredientiProdottiLocale, LocaleIdResponse } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { addExtraIngredient, removeExtraIngredient, toggleIngredient } from "../../../../redux/reducers/orderReducer";

interface ProductFilterModalProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function ProductFilterModal(p: ProductFilterModalProps) {
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const newProduct: CartProduct | null = useSelector((state: RootState) => state.order.newProduct);
  const dispatch: AppDispatch = useDispatch();
  console.log(newProduct);

  return (
    <div>
      {newProduct && (
        <Modal dialogClassName="rounded-0" show={p.show} onHide={p.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className=" font-breef">{newProduct.nomeProdotto}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span className="text-leaf-500 me-1 fw-bold">EXTRA INGREDIENTI</span>
                </Accordion.Header>
                <Accordion.Body>
                  {locale?.ingredientiRistorante.map((ingrediente: IngredientiProdottiLocale, index) => (
                    <div key={`ingredientiRistorante-${index}`} className=" row py-1 ">
                      <div className="col-12">
                        <Row className=" border-bottom border-success ">
                          <Col className="col-sm-9 col-12 mb-2 d-flex align-items-end flex-wrap">
                            {ingrediente.nomeIngrediente}
                            <span>(+ € {ingrediente.prezzoIngrediente})</span>
                          </Col>
                          <Col className="offset-sm-0 offset-6 col-sm-3 col-6 d-flex align-items-end ">
                            <Row>
                              <Col className="col-4 px-0 d-flex align-items-end">
                                <button
                                  className="btn btn-outline-success w-100  rounded-0"
                                  onClick={() => dispatch(addExtraIngredient(ingrediente))}
                                >
                                  {" "}
                                  +{" "}
                                </button>
                              </Col>
                              <Col className="col-4 px-0 d-flex align-items-end">
                                <button className="w-100 h-100 btn btn-light rounded-0 ">
                                  {newProduct.ingredienti?.find(
                                    (ing) => ing.idIngrediente === ingrediente.idIngrediente && ing.isExtra
                                  )?.quantita || 0}
                                </button>
                              </Col>
                              <Col className="col-4 px-0 d-flex align-items-end">
                                <button
                                  className="btn btn-outline-danger w-100  rounded-0"
                                  onClick={() => dispatch(removeExtraIngredient(ingrediente))}
                                >
                                  -
                                </button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span className="text-danger me-1 fw-bold">RIMUOVI INGREDIENTI</span>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    Seleziona gli ingredienti da <span className="fw-bold text-danger">rimuovere</span>
                  </div>
                  <div>
                    {newProduct.ingredienti
                      ?.filter((ingrediente) => !ingrediente.isExtra)
                      .map((ingrediente, index) => (
                        <Row key={`ingredientiProdotto-${index}`} className=" py-1">
                          <Col className="col-12">
                            <label className="form-check-label w-100 fs-5" typeof={ingrediente.nomeIngrediente}>
                              <input
                                className="form-check-input danger"
                                type="checkbox"
                                checked={ingrediente.quantita == 0}
                                onChange={() => dispatch(toggleIngredient(ingrediente))}
                                id={ingrediente.nomeIngrediente}
                              />
                              <span className="ms-1 fs-6">{ingrediente.nomeIngrediente}</span>
                            </label>
                          </Col>
                        </Row>
                      ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Modal.Body>
          <Modal.Footer className=" justify-content-between">
            <Button className="btn btn-gray-500 rounded-0 button-border-gray text-white" onClick={p.handleClose}>
              CHIUDI
            </Button>
            <Button className="btn btn-leaf-500 rounded-0 button-border-success text-white">
              CONFERMA{" "}
              {`(+ € ${newProduct.ingredienti
                ?.filter((ingrediente) => ingrediente.isExtra)
                .reduce((total, ingrediente) => total + ingrediente.quantita * ingrediente.prezzoIngrediente, 0)})`}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ProductFilterModal;
