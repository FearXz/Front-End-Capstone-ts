import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { GetBoLocaleIdResponse } from "../../../../../interfaces/interfaces";

function PreviewPage() {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  return (
    <Container style={{ maxWidth: 1200 }}>
      <Row className="my-1">
        <Col className="col-12">
          <div
            className="d-flex justify-content-center align-items-center shadow-sm "
            style={{
              backgroundImage: `url(${
                locale?.imgCopertina
                  ? locale.imgCopertina
                  : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
            }}
          ></div>
        </Col>
      </Row>
      <Row>
        {locale && (
          <Col className="col-xxl-10 col-12 pe-xxl-5 ps-xl-4 pe-xl-5 pe-md-4 px-3">
            <Row>
              <Col className="col-xxl-8 col-sm-7 col-12">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      locale.imgLogo
                        ? locale.imgLogo
                        : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                    }
                    className="fix-h-70 fix-w-70 border-lightw me-2 mb-2"
                    alt={locale.nomeRistorante}
                  />
                  <h1 className="h2 font-breef mb-1">{locale.nomeRistorante}</h1>
                </div>
                {locale.categorieRistorante &&
                  locale.categorieRistorante.map((categoria, index) => (
                    <small key={index} className="text-uppercase border p-1 my-1 me-1 d-inline-block">
                      {categoria.nomeCategoria}
                    </small>
                  ))}
              </Col>
              <Col className="col-xxl-4 col-sm-5 col-12 py-sm-0 py-1">
                <div className="text-sm-end text-start">
                  <div className="restaurant-full-address">
                    <i className="bi bi-geo-alt-fill text-leaf-500"></i>&nbsp;{locale.indirizzo}, {locale.cap}{" "}
                    {locale.citta}
                  </div>
                  <div>
                    {" "}
                    <i className="bi bi-info-square-fill me-1 text-leaf-500"></i>P. IVA:{locale.partitaIva}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 py-2">{locale.descrizione}</Col>
            </Row>
          </Col>
        )}
        {locale && (
          <Col className="col-xxl-2 col-12 px-xxl-2 ps-xl-4 pe-xl-5 pe-md-4 px-3">
            <Row>
              <Col className="col-xxl-12 col-md-7 col-sm-8 col-12 py-sm-2 py-1">
                <strong className="text-leaf-500">
                  <i className="bi bi-info-circle-fill me-1"></i>
                  Orari di apertura:{" "}
                </strong>
                {locale.orarioApertura} - {locale.orarioChiusura}
                <span className="d-block pb-2"></span>
                <i className="bi bi-info-circle-fill me-1 text-leaf-500"></i>
                <strong className="text-leaf-500">Pagamenti accettati: </strong>
                Carte di credito
              </Col>
              <Col className="col-xxl-12 col-md-5 col-sm-4 col-12 py-sm-2 py-1 text-xxl-start text-sm-end text-start"></Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default PreviewPage;
