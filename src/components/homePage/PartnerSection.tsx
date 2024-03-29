import { Col, Container, Row } from "react-bootstrap";
import imgDriver from "../../assets/images/img-driver.jpg";
import imgPartner from "../../assets/images/img-partner.jpg";
function PartnerSection() {
  return (
    <section className="section-app py-7">
      <Container>
        <Row>
          <Col className="col-md-6 col-12 py-lg-5 py-4 text-white fs-5 text-md-start text-center">
            <div className="col-image">
              <img src={imgPartner} alt="La proprietaria di un ristorante | Take2Me.it" className="img-fluid" />
              <h3 className="h2 font-breef mb-0 py-md-4 py-2">Diventa nostro partner!</h3>
              <p className=" fs-5">
                Gestisci un locale? Take2me è sempre in continua espansione, diventa nostro partner e raggiungi sempre
                più clienti.
                <br />
                Avrai più opportunità per il tuo business, pubblicità per la tua attività e nuovi ordini, cosa aspetti?
                <br />
                <br />
              </p>
              <div className="app-links">
                <a
                  href="https://take2me.it/affiliazione"
                  className="btn btn-light py-2 px-5 rounded-0 fw-semibold fs-6 button-border-light"
                >
                  SCOPRI DI PIÙ
                </a>
              </div>
            </div>
          </Col>
          <Col className="col-md-6 col-12 py-lg-5 py-4 text-white fs-5 text-md-start text-center">
            <div className="col-image">
              <img
                src={imgDriver}
                alt="Driver in bici con la borsa di Take2Me.it per le consegne"
                className="img-fluid"
              />
              <h3 className="h2 font-breef mb-0 py-md-4 py-2">Diventa nostro driver!</h3>
              <p className=" fs-5">
                Scegli la flessibilità di un lavoro che ti permette di avere tempo libero, un incasso fisso e benefit
                mensili.
                <br />
                Devi solo essere in possesso di un tuo mezzo (Auto-Moto-Ebike).
                <br />
                Clicca su "Scopri di più", compila il form e verrai ricontattato.
                <br />
              </p>
              <div className="app-links">
                <a
                  href="https://take2me.it/drivers"
                  className="btn btn-light py-2 px-5 rounded-0 fw-semibold fs-6 button-border-light"
                >
                  SCOPRI DI PIÙ
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PartnerSection;
