import { Col, Container, Row } from "react-bootstrap";
import UtenteSidebar from "./inner/UtenteSidebar";
import UtenteMainSection from "./inner/UtenteMainSection";

function UtentePage() {
  return (
    <main>
      <Container fluid>
        <Row className="">
          <Col className="col-3  bg-gray p-0 d-none d-sm-block ">
            <UtenteSidebar />
          </Col>
          <Col className="col-12 col-sm-9 pb-20">
            <UtenteMainSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default UtentePage;
