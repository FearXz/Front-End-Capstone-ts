import { Col, Container, Form, Row } from "react-bootstrap";

function BackOfficePage() {
  return (
    <main>
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-center font-breef my-3">BackOffice</h1>
          </Col>
          <Col xs={12}>
            <Form.Control
              className="rounded-0 fix-h-50  my-input focus"
              type="text"
              placeholder="Cerca il tuo locale"
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default BackOfficePage;
