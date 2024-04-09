import { Col, Container, Row } from "react-bootstrap";
import { CartProduct, CoordinateSearch, LocaleIdResponse } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { isAfter, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MobileOrder() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const luogoConsegna: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const navigate: Function = useNavigate();

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (cart.length > 0) {
      if (selectedHour && isAfter(parse(selectedHour, "HH:mm", new Date()), new Date())) {
        if (locale && luogoConsegna) {
          navigate("/checkout");
        }
      } else {
        toast.error("Errore: inserisci un orario valido!");
      }
    } else {
      toast.error("Errore: inserisci almeno un prodotto nel carrello!");
    }
  }

  return (
    <div className=" bg-leaf-500 d-lg-none d-block shadow py-1 mobile-checkout">
      <Container fluid>
        <Row>
          <Col className="col-sm-6 col-12 d-flex align-items-center flex-wrap">
            <div className="text-white d-flex align-content-center">
              <p className="ms-3 mb-0">{luogoConsegna?.display_name ? luogoConsegna.display_name : ""}</p>
            </div>
          </Col>
          <Col className="col-sm-6 col-12 d-flex align-content-center">
            <Row className=" align-items-center w-100">
              <Col className="col-2 px-0">
                <button className="btn btn-leaf-500 w-100 h-100 p-0 border-0">
                  <i className="bi bi-basket3-fill text-white fs-3"></i>
                </button>
              </Col>
              <Col className="col-10  px-0 ">
                {cart && (
                  <button className="btn btn-leaf-500  w-100 border-0 py-0" onClick={handleSubmit}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className=" fw-bold py-1 mb-0 text-start">
                        <span className=" text-white">
                          {cart.reduce((total, product) => total + product.quantita, 0)}
                        </span>{" "}
                        <span className="text-white text-white">{cart.length > 1 ? "PRODOTTI" : "PRODOTTO"}</span>
                      </p>
                      <strong>
                        Cassa <i className="bi bi-caret-right"></i>{" "}
                        <span className="">
                          €{" "}
                          {cart
                            .reduce(
                              (total, product) => total + (product.totale ? product.totale * product.quantita : 0),
                              0
                            )
                            .toFixed(2)}
                        </span>{" "}
                      </strong>
                    </div>
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MobileOrder;
