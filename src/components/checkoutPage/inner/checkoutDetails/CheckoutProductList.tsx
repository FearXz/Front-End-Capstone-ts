import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartProduct, ListaRistorantiResponse } from "../../../../interfaces/interfaces";
import { RootState } from "../../../../redux/store/store";

function CheckoutProductList() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const lastRestaurant: ListaRistorantiResponse | null = useSelector((state: RootState) => state.persist.restaurantId);
  const navigate: Function = useNavigate();

  return (
    <Col className="col-lg-5 col-md-6 col-12">
      <h3 className="h3 font-breef">Prodotti</h3>
      {/* INIZIO MAP */}
      {cart &&
        cart?.map((product: CartProduct, index: number) => (
          <Row key={"product-" + index} className=" py-1">
            <Col className="col-1">
              <strong>2x</strong>
            </Col>
            <Col className="col-8">{product.nomeProdotto}</Col>
            <Col className="col-3 text-end">€&nbsp;{product.totale?.toFixed(2)}</Col>
            <Col className="col-12 text-start mt-1">
              {product.ingredienti
                .filter((ing) => ing.isExtra)
                .map((ing, index) => (
                  <p key={"con-" + index} className="m-0">
                    <strong className="text-leaf-500">extra</strong> {ing.nomeIngrediente + " x" + ing.quantita}{" "}
                  </p>
                ))}
              {product.ingredienti
                .filter((ing) => ing.isExtra == false && ing.quantita == 0)
                .map((ing, index) => (
                  <p key={"con-" + index} className="m-0">
                    <strong className="text-danger">senza</strong> {ing.nomeIngrediente}{" "}
                  </p>
                ))}
            </Col>
          </Row>
        ))}
      {/* FINE MAP */}
      <span className="d-block border-top border-2 border-success mt-3"></span>
      <Row className=" pt-2">
        <Col className="col-9">
          <span className="fw-bold">Totale</span>
        </Col>
        <Col className="col-3 text-end">
          <span id="cart-total">
            €{" "}
            {cart
              .reduce((total, product) => total + (product.totale ? product.totale * product.quantita : 0), 0)
              .toFixed(2)}
          </span>
        </Col>
      </Row>
      <Row className=" py-3">
        <div className="col-12 text-end">
          <button
            className="btn btn-gray-500 rounded-0 button-border-gray  text-white btn-sm fw-bold"
            onClick={() => (lastRestaurant?.idRistorante ? navigate("/local/" + lastRestaurant.idRistorante) : "")}
          >
            <span className="d-sm-none d-inline">Vai al carrello</span>
            <span className="d-sm-inline d-none">Torna al carrello</span>
          </button>
        </div>
      </Row>
    </Col>
  );
}

export default CheckoutProductList;
