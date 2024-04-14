import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ContactBreadCrumb() {
  return (
    <section>
      <Container>
        <Row>
          <Col className="col-12 py-3 d-flex align-item-center fs-5">
            <Link to="/" className="btn btn-link fw-light fs-5 text-decoration-none text-black py-0">
              Home
            </Link>
            <p className=" mb-0 ">|</p>
            <p className=" mb-0 btn btn-link fw-light fs-5 text-decoration-none text-black py-0">Contattaci</p>
          </Col>
        </Row>
      </Container>
      <hr className="m-0 border-gray-600" />
    </section>
  );
}

export default ContactBreadCrumb;
