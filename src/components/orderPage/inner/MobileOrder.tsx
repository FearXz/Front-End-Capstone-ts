import { Col, Container, Row } from "react-bootstrap";

function MobileOrder() {
  return (
    <div className=" bg-leaf-500 d-lg-none d-block shadow py-1 mobile-checkout">
      <Container fluid>
        <Row>
          <Col className="col-sm-6 col-12 d-flex align-items-center flex-wrap">
            <div className="text-white">
              In{" "}
              <span className="cart-delivery-address">
                Via Enrico Fermi, 10, San Giovanni in Marignano
                <button className="btn btn-link btn-action btn-modify-address py-0 ps-1 pe-0" type="button">
                  <i className="fa fa-pencil text-white"></i>
                </button>
              </span>
            </div>
          </Col>
          <Col className="col-sm-6 col-12">
            <Row>
              <Col className="col-2 px-0">
                <button type="button" className="btn btn-leaf-500 w-100 h-100 p-0 border-0">
                  <i className="bi bi-basket3-fill text-white fs-3"></i>
                </button>
              </Col>
              <Col className="col-10  px-0 ">
                <button type="button" className="btn btn-leaf-500  w-100 border-0 py-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className=" fw-bold py-1 mb-0 text-start">
                      <small>
                        <span className="fast-checkout-products-cart text-white">1</span>{" "}
                        <span className="text-white text-white">PRODOTTO</span>
                      </small>
                    </p>
                    <strong>
                      Cassa <i className="bi bi-caret-right"></i> <span className="cart-total">€ 0,00</span>{" "}
                    </strong>
                  </div>
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MobileOrder;
