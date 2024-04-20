import { Col, Modal, Row } from "react-bootstrap";
import { RootState } from "../../../../../redux/store/store";
import { useSelector } from "react-redux";
import { BoOrdiniLocaleId, BoProdottiAcquistati } from "../../../../../interfaces/interfaces";

interface ModalOrderDetailProps {
  show: boolean;
  handleClose: () => void;
}

function ModalOrderDetail(props: ModalOrderDetailProps) {
  const order: BoOrdiniLocaleId | null = useSelector((state: RootState) => state.backoffice.selectedOrderModal);

  return (
    <div>
      {order && (
        <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Ordine No.{order.idOrdini}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="px-xxl-5 px-3" style={{ overflow: "auto", height: "auto" }}>
              {/* MAP ELEMENTI CARRELLO */}
              {order &&
                order?.prodottiAcquistati.map((product: BoProdottiAcquistati, index: number) => (
                  <Row key={`product-${index}`} className="py-2">
                    <Col className=" d-flex justify-content-between">
                      <h5 className="mb-0 fw-bold">
                        {product.nomeProdotto} X{product.quantita} - {product.prezzoTotale}€
                      </h5>
                      &nbsp;
                    </Col>
                    <Col className="col-12 text-start mt-1">
                      {product?.ingredientiAcquistati
                        .filter((ing) => ing.isExtra)
                        .map((ing, index) => (
                          <div key={"con-" + index} className="m-0">
                            <strong className="text-leaf-500">extra</strong> {ing.nomeIngrediente + " x" + ing.quantita}{" "}
                          </div>
                        ))}
                      {product?.ingredientiAcquistati
                        .filter((ing) => ing.isExtra == false && ing.quantita == 0)
                        .map((ing, index) => (
                          <div key={"con-" + index} className="m-0">
                            <strong className="text-danger">senza</strong> {ing.nomeIngrediente}{" "}
                          </div>
                        ))}
                    </Col>
                  </Row>
                ))}

              {/* FINE MAP */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-leaf-500 button-border-success text-white rounded-0" onClick={props.handleClose}>
              Chiudi
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ModalOrderDetail;
