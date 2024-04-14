import { Col, Container, Row } from "react-bootstrap";

function ContactHero() {
  return (
    <section>
      <Container className=" text-center">
        <Row className=" px-5 py-5">
          <Col className="col-12">
            <h1 className=" display-3 font-breef">Contatti Take2Me, Servizio Consegna Cibo a Domicilio</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="col-12">
            <p className=" fw-light fs-4">
              Hai bisogno di aiuto? Non esitare a contattarci.
              <br />
              Compila il seguente form per essere ricontattato al più presto!
              <br />
              <br />
              No non abbiamo un numero di telefono dedicato ma il nostro Customer Care dedicato è sempre attivo e in men
              che non si dica, risponderemo a tutte le tue perplessità.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactHero;
