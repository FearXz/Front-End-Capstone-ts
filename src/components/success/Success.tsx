import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { VerifySession } from "../../redux/actions/checkoutAction";
import { Col, Container, Row } from "react-bootstrap";

function Success() {
  const location = useLocation();
  const paymentStatus: boolean = useSelector((state: RootState) => state.global.paymentStatus);
  const dispatch: AppDispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id") ? queryParams.get("session_id") : "";

  useEffect(() => {
    if (sessionId) {
      dispatch(VerifySession(sessionId));
    }
  }, [sessionId]);

  return (
    <main>
      <Container>
        <Row className=" justify-content-center">
          <Col>
            <h1 className={paymentStatus ? "text-leaf-500 text-center" : "text-danger text-center"}>
              {paymentStatus ? "Ordine completato con successo" : "Errore nella verifica del pagamento"}
            </h1>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Success;
