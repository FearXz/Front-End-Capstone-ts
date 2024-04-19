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
                <Link to={"/contatti"} className="text-gray-500 text-decoration-none">
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
              <Link
                to="http://localhost:5173/searchlocal/Rimini"
                className="text-gray-500 text-decoration-none  d-block"
              >
                Rimini
              </Link>
              <Link
                to="http://localhost:5173/searchlocal/Riccione"
                className="text-gray-500 text-decoration-none  d-block"
              >
                Riccione
              </Link>
              <Link
                to="http://localhost:5173/searchlocal/Misano%20Adriatico"
                className="text-gray-500 text-decoration-none  d-block"
              >
                Misano Adriatico
              </Link>
              <Link
                to="http://localhost:5173/searchlocal/Cattolica"
                className="text-gray-500 text-decoration-none  d-block"
              >
                Cattolica
              </Link>
              <Link
                to="http://localhost:5173/searchlocal/Pesaro"
                className="text-gray-500 text-decoration-none  d-block"
              >
                Pesaro
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default MyFooter;
