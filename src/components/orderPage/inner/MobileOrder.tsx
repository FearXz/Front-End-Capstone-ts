import { Col, Container, Row } from "react-bootstrap";
import { CartProduct, CoordinateSearch } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

function MobileOrder() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const indirizzoCercato: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);

  return (
    <div className=" bg-leaf-500 d-lg-none d-block shadow py-1 mobile-checkout">
      <Container fluid>
        <Row>
          <Col className="col-sm-6 col-12 d-flex align-items-center flex-wrap">
            <div className="text-white d-flex align-content-center">
              <p className="ms-3 mb-0">{indirizzoCercato?.display_name ? indirizzoCercato.display_name : ""}</p>
            </div>
          </Col>
          <Col className="col-sm-6 col-12 d-flex align-content-center">
            <Row className=" align-items-center w-100">
              <Col className="col-2 px-0">
                <button className="btn btn-leaf-500 w-100 h-100 p-0 border-0">
                  <i className="bi bi-basket3-fill text-white fs-3"></i>
                </button>
              </Col>
              <Col className="col-10  px-0 ">
                {cart && (
                  <button className="btn btn-leaf-500  w-100 border-0 py-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className=" fw-bold py-1 mb-0 text-start">
                        <span className=" text-white">
                          {cart.reduce((total, product) => total + product.quantita, 0)}
                        </span>{" "}
                        <span className="text-white text-white">{cart.length > 1 ? "PRODOTTI" : "PRODOTTO"}</span>
                      </p>
                      <strong>
                        Cassa <i className="bi bi-caret-right"></i>{" "}
                        <span className="">
                          €{" "}
                          {cart
                            .reduce(
                              (total, product) => total + (product.totale ? product.totale * product.quantita : 0),
                              0
                            )
                            .toFixed(2)}
                        </span>{" "}
                      </strong>
                    </div>
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MobileOrder;
