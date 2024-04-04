import { Col, Row } from "react-bootstrap";
import MobileFilterCategory from "./inner/MobileFilterCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { ListaRistorantiResponse } from "../../../interfaces/interfaces";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

function SearchLocalList() {
  const listaRistoranti = useSelector((state: RootState) => state.searchRistorante.listaRistoranti);
  const filtroSearchBar = useSelector((state: RootState) => state.searchRistorante.filtroSearchBar);
  const filtroCheckBox = useSelector((state: RootState) => state.searchRistorante.filtroCheckBox);
  const filtroRange = useSelector((state: RootState) => state.searchRistorante.filtroRange);

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
                  className="d-block restaurant-img  bg-cover rounded-3 position-relative "
                  style={
                    ristorante.imgCopertina
                      ? { backgroundImage: `url(${ristorante.imgCopertina})` }
                      : {
                          backgroundImage: `url("https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg")`,
                        }
                  }
                >
                  <img
                    src="https://thumbnails.take2me.it/w_50/h_50/fit_crop-bottom/url/https://cdn.take2me.it/img/restaurants/8/0/d/80d2e290-1176-4764-a65f-ac1de8e4f97f.jpg"
                    className="img-logo border-light"
                    alt={ristorante.nomeRistorante}
                  />
                </Link>
                <div className="pt-5">
                  <Link to={`/local/${ristorante.idRistorante}`} className="text-black text-decoration-none">
                    <h5 className="h5 mb-0 fw-bold ">{ristorante.nomeRistorante}</h5>
                  </Link>

                  <Row className="justify-content-between">
                    <Col className="">{ristorante.tagRistorante}</Col>
                    <Col className=" text-end">{ristorante.distanza.toFixed(2)} km</Col>
                  </Row>
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
