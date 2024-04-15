import { Col, Container, Row } from "react-bootstrap";

function ContactAffiliate() {
  return (
    <section className="text-center">
      <Container>
        <Row className=" py-6">
          <Col className="col-12">
            <h3 className=" font-breef">Vuoi ricevere informazioni per affiliarti a Take2Me?</h3>
          </Col>
        </Row>
        <Row className=" pb-5">
          <Col className="col-12">
            <p className=" fw-light fs-5">
              Entra a far parte di Take2Me.it e allarga il tuo giro di clienti!
              <br />
              Se hai un ristorante, una pizzeria, un take away di sushi, una piadineria, una rosticceria, una
              kebabberia, una gelateria, insomma qualunque attività che venda cibo già pronto, Take2Me.it fa al caso
              tuo.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactAffiliate;
