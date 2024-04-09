import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import {
  CartOrderDto,
  CartProduct,
  CoordinateSearch,
  ListaRistorantiResponse,
  LoginResponse,
} from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { createSession } from "../../../../redux/actions/checkoutAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutOrderInfo() {
  const user: LoginResponse | null = useSelector((state: RootState) => state.auth.loggedProfile);
  const locale: ListaRistorantiResponse | null = useSelector((state: RootState) => state.persist.restaurantId);
  const indirizzo: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const navigate: Function = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [note, setNote] = useState<string>("");

  async function handleCheckout() {
    const cartOrderDto: CartOrderDto = {
      idRistorante: locale?.idRistorante ? locale.idRistorante : 0,
      indirizzoDiConsegna: indirizzo ? indirizzo.display_name : "",
      orarioConsegnaPrevista: selectedHour ? selectedHour : "",
      note: note,
      totale: cart.reduce((total, product) => total + (product.totale ? product.totale * product.quantita : 0), 0),
      prodotti: cart,
    };
    console.log(cartOrderDto);
    dispatch(createSession(cartOrderDto));
  }

  return (
    <Col className="offset-lg-1 col-md-6 col-12 pb-5">
      <h3 className="h3 font-breef">Informazioni</h3>
      <dl className="row">
        <dt className="col-3">Cliente</dt>
        <dt className="col-9">{user && user.utente.nome + " " + user.utente.cognome}</dt>
        <dt className="col-3">Locale: </dt>
        <dd className="col-9 ">{locale && locale.nomeRistorante}</dd>
        <dt className="col-3">Consegna in </dt>
        <dd className="col-9">{indirizzo && indirizzo.display_name}</dd>
      </dl>
      <FloatingLabel
        controlId="floatingInput"
        label="Descrizione dell'ordine (opzionale)"
        className="mb-3 overflow-hidden"
      >
        <Form.Control
          as="textarea"
          value={note}
          placeholder=""
          className="rounded-0 focus"
          style={{ height: "100px" }}
          onChange={(e) => setNote(e.currentTarget.value)}
        />
      </FloatingLabel>
      <Row>
        <Col className="col-6">
          <button
            className="btn btn-gray-500 rounded-0 button-border-gray  text-white btn-sm fw-bold"
            onClick={() => (locale?.idRistorante ? navigate("/local/" + locale.idRistorante) : "")}
          >
            <span className="d-sm-none d-inline">Vai al carrello</span>
            <span className="d-sm-inline d-none">Torna al carrello</span>
          </button>
        </Col>
        <Col className="col-6 text-end">
          <button
            className="btn btn-leaf-500 rounded-0 button-border-success  text-white btn-sm fw-bold"
            onClick={() => handleCheckout()}
          >
            Ordina
          </button>
        </Col>
      </Row>
    </Col>
  );
}

export default CheckoutOrderInfo;
