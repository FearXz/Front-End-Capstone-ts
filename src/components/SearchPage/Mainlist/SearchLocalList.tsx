import { Col, Row } from "react-bootstrap";
import MobileFilterCategory from "./inner/MobileFilterCategory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { ListaRistorantiResponse } from "../../../interfaces/interfaces";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import { setRestaurantId } from "../../../redux/reducers/persistedInfoReducer";
import { isChiuso } from "../../../functions/functions";

function SearchLocalList() {
  const listaRistoranti = useSelector((state: RootState) => state.searchRistorante.listaRistoranti);
  const filtroSearchBar = useSelector((state: RootState) => state.searchRistorante.filtroSearchBar);
  const filtroCheckBox = useSelector((state: RootState) => state.searchRistorante.filtroCheckBox);
  const filtroRange = useSelector((state: RootState) => state.searchRistorante.filtroRange);
  const dispatch: AppDispatch = useDispatch();

  const currentDay = new Date().getDay();

  const filteredRestaurants = listaRistoranti?.filter(
    (ristorante: ListaRistorantiResponse) =>
      ristorante.nomeRistorante.toLowerCase().includes(filtroSearchBar.toLowerCase()) &&
      (filtroCheckBox.length == 0 ||
        filtroCheckBox.every((id) =>
          ristorante.categorieRistorante.some((categoria) => categoria.idCategorie === id)
        )) &&
      ristorante.distanza <= filtroRange
  );

  return (
    <div>
      <MobileFilterCategory />

      <TransitionGroup className="row">
        {filteredRestaurants?.map((ristorante: ListaRistorantiResponse, index) => (
          <CSSTransition key={`ristorante-${index}`} timeout={500} classNames="fade">
            <Col className="col-xxl-3 col-xl-4 col-sm-6 col-12 px-2">
              <div className="py-2 px-2 my-3 shadow ">
                <Link
                  to={`/local/${ristorante.idRistorante}`}
                  onClick={() => dispatch(setRestaurantId(ristorante))}
                  className="d-block restaurant-img fix-h-230  rounded-3 position-relative "
                  style={
                    isChiuso(ristorante?.orarioApertura || "", ristorante?.orarioChiusura || "") ||
                    ristorante.giorniDiChiusura.some((giorno) => giorno.numeroGiorno === currentDay)
                      ? { filter: "grayscale(100%)", opacity: "0.5" /* , pointerEvents: "none" */ }
                      : {}
                  }
                >
                  <img
                    className="w-100 h-100 rounded-3 object-fit-cover"
                    src={
                      ristorante.imgCopertina
                        ? ristorante.imgCopertina
                        : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    alt=""
                  />
                  <img
                    src={
                      ristorante.imgLogo
                        ? ristorante.imgLogo
                        : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    className="img-logo border-light"
                    alt={ristorante.nomeRistorante}
                  />
                  {ristorante.giorniDiChiusura.some((giorno) => giorno.numeroGiorno == currentDay) ? (
                    <div className=" bg-danger text-white p-2 fw-bold restaurant-alert-absolute">Oggi chiuso</div>
                  ) : isChiuso(ristorante.orarioApertura, ristorante.orarioChiusura) ? (
                    <div className=" bg-white text-black fw-semibold p-2 restaurant-preorder-absolute">
                      PREORDINA
                      <br />
                      {ristorante.orarioApertura}{" "}
                    </div>
                  ) : (
                    <div className=" bg-white text-black fw-semibold p-2 restaurant-preorder-absolute">
                      CHIUDE ALLE
                      <br />
                      {ristorante.orarioChiusura}{" "}
                    </div>
                  )}
                </Link>
                <div className="pt-5">
                  <Link
                    style={
                      ristorante.giorniDiChiusura.some((giorno) => giorno.numeroGiorno == currentDay)
                        ? { filter: "grayscale(100%)", opacity: "0.5", pointerEvents: "none" }
                        : {}
                    }
                    to={`/local/${ristorante.idRistorante}`}
                    className="text-black text-decoration-none"
                  >
                    <h5 className="h5 mb-0 fw-bold ">{ristorante.nomeRistorante}</h5>
                    <Row className="justify-content-between">
                      <Col className="">{ristorante.tagRistorante}</Col>
                      <Col className=" text-end">{ristorante.distanza.toFixed(2)} km</Col>
                    </Row>
                  </Link>
                </div>
              </div>
            </Col>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
export default SearchLocalList;
