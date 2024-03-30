import { Col, Row } from "react-bootstrap";
import MobileFilterCategory from "./inner/MobileFilterCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { ListaRistorantiResponse } from "../../../interfaces/interfaces";

function SearchLocalList() {
  const listaRistoranti = useSelector((state: RootState) => state.searchRistorante.listaRistoranti);
  return (
    <div>
      <MobileFilterCategory />
      <Row>
        {listaRistoranti &&
          listaRistoranti.map((ristorante: ListaRistorantiResponse, index) => (
            <Col key={`ristorante-${index}`} className="col-xxl-3 col-xl-4 col-sm-6 col-12 px-2">
              <div className="py-2 px-2 my-3 shadow ">
                <a
                  href="https://take2me.it/locali/canapa-house-riccione.html"
                  className="d-block restaurant-img noimage bg-cover rounded-3 position-relative lazy"
                  style={{
                    backgroundImage:
                      'url("https://thumbnails.take2me.it/w_348/h_230/fit_crop-bottom/url/https://cdn.take2me.it/img/restaurants/e/9/f/e9f7ba27-32e4-4ad3-95f5-53515a3a3347.jpg")',
                  }}
                >
                  <img
                    src="https://thumbnails.take2me.it/w_50/h_50/fit_crop-bottom/url/https://cdn.take2me.it/img/restaurants/8/0/d/80d2e290-1176-4764-a65f-ac1de8e4f97f.jpg"
                    className="img-logo border-lightw"
                    alt="Canapa House "
                  />
                </a>
                <div className="pt-5">
                  <a href="https://take2me.it/locali/canapa-house-riccione.html" className="text-secondary">
                    <h5 className="h5 mb-0 fw-bold ">{ristorante.nomeRistorante}</h5>
                  </a>

                  <Row className="justify-content-between">
                    <Col className="fw-light">{ristorante.descrizione}</Col>
                    <Col className=" text-end">{ristorante.distanza.toFixed(2)} km</Col>
                  </Row>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}
export default SearchLocalList;
