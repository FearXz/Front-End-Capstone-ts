import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyFooter() {
  return (
    <footer className="footer-bg">
      <Container>
        <Row className="py-7">
          <Col>
            <h4 className="h4 text-white font-breef">INFO</h4>
            <div className="py-lg-3 py-1 fs-5 ">
              <div className="px-0 ">
                <Link to={""} className=" text-gray-500 text-decoration-none">
                  Chi siamo
                </Link>
                <span className="d-block"></span>
                <Link to={""} className="text-gray-500 text-decoration-none">
                  Programma fedeltà
                </Link>
                <span className="d-block"></span>
                <Link to={""} className="text-gray-500 text-decoration-none">
                  Blog
                </Link>
                <span className="d-block"></span>
                <Link to={""} className="text-gray-500 text-decoration-none">
                  <strong>Contatti</strong>
                </Link>
                <span className="d-block"></span>
                <Link to={""} className="text-gray-500 text-decoration-none">
                  Lavora con noi
                </Link>
              </div>
            </div>
          </Col>
          <Col className="">
            <h4 className="h4 text-white font-breef ">CITTÀ</h4>

            <div className="py-lg-3 py-1 fs-5 ">
              <a href="https://take2me.it/cerca/rimini" className="text-gray-500 text-decoration-none  ">
                Rimini
              </a>
              <span className="d-block"></span>
              <a href="https://take2me.it/cerca/riccione" className="text-gray-500 text-decoration-none  ">
                Riccione
              </a>
              <span className="d-block"></span>
              <a href="https://take2me.it/cerca/misano-adriatico" className="text-gray-500 text-decoration-none  ">
                Misano Adriatico
              </a>
              <span className="d-block"></span>
              <a href="https://take2me.it/cerca/cattolica" className="text-gray-500 text-decoration-none  ">
                Cattolica
              </a>
              <span className="d-block"></span>
              <a href="https://take2me.it/cerca/pesaro" className="text-gray-500 text-decoration-none  ">
                Pesaro
              </a>
              <span className="d-block"></span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
