import { Col, Container, Row } from "react-bootstrap";
import { ListaRistorantiResponse } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

function CheckoutHeader() {
  const locale: ListaRistorantiResponse | null = useSelector((state: RootState) => state.persist.restaurantId);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  return (
    <section>
      <Container>
        <Row>
          <Col className="col-12 text-center py-xl-5 py-lg-4 py-3">
            <h1 className="h2 font-breef">
              {" "}
              Riepilogo ordine presso <span className=" text-leaf-500 d-block">{locale?.nomeRistorante}</span>
            </h1>
            <div className="pt-xl-5 pt-md-3 pt-2 pb-3">
              <div className="h3 font-breef">
                Orario richiesto: <span className=" text-leaf-500">{selectedHour}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CheckoutHeader;
