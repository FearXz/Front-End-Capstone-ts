import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { GetBoLocaleIdResponse } from "../../../interfaces/interfaces";
import PreviewPage from "./BackOfficeLocalePage/PreviewPage";
import { useState } from "react";
import LocalMainModal from "./BackOfficeLocalePage/LocalMainModal";
import LocalDayOffModal from "./BackOfficeLocalePage/LocalDayOffModal";

function BackOfficeLocalePage() {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const [preview, setPreview] = useState<boolean>(false);

  const [mainModalShow, setMainModalShow] = useState(false);
  const showMain = () => setMainModalShow(true);
  const closeMain = () => setMainModalShow(false);

  const [dayOffModalShow, setDayOffModalShow] = useState(false);
  const closeDayOff = () => setDayOffModalShow(false);
  const showDayOff = () => setDayOffModalShow(true);

  return (
    <Container>
      {mainModalShow && <LocalMainModal show={mainModalShow} handleClose={closeMain} />}
      {dayOffModalShow && <LocalDayOffModal show={dayOffModalShow} handleClose={closeDayOff} />}
      <Row>
        <Col xs={1} className="d-flex align-items-center">
          <i className="bi bi-aspect-ratio fs-3 hover" onClick={() => setPreview((prev) => !prev)}></i>
        </Col>
        <Col xs={10}>
          <h1 className="text-center font-breef mt-2 mb-3">PANNELLO DI CONTROLLO</h1>
        </Col>
        <Col xs={1} className="d-flex align-items-center">
          <i className="bi bi-pencil-square fs-3 hover" onClick={() => showMain()}></i>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Ristorante </h2>
          <p className=" fs-5">{locale?.nomeRistorante}</p>
        </Col>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Indirizzo</h2>
          <p className=" fs-5">
            {locale?.indirizzo}, {locale?.cap} {locale?.citta}
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Orario Apertura </h2>
          <p className=" fs-5">{locale?.orarioApertura}</p>
        </Col>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Orario Chiusura</h2>
          <p className=" fs-5">{locale?.orarioChiusura}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Cellulare </h2>
          <p className=" fs-5">{locale?.telefono}</p>
        </Col>
        <Col xs={12} lg={6} className=" ">
          <h2 className="font-breef">Descrizione</h2>
          <p className=" fs-5">{locale?.descrizione}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil-square fs-4 hover me-2" onClick={() => showDayOff()}></i>
            <h2 className="font-breef">Giorni Chiusura </h2>
          </div>
          <p className=" fs-5">{locale?.giorniDiChiusura.map((g) => g.nomeGiorno + " ")}</p>
        </Col>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil-square fs-4 hover me-2"></i>
            <h2 className="font-breef">Tag Categorie </h2>
          </div>
          <p className=" fs-5">{locale?.categorieRistorante.map((c) => c.nomeCategoria + " ")}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil-square fs-4 hover me-2"></i>
            <h2 className="font-breef">Logo </h2>
          </div>
          <img className=" fix-h-80 fix-w-80" src={locale?.imgLogo ? locale?.imgLogo : ""} alt="logo" />
        </Col>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil-square fs-4 hover me-2"></i>
            <h2 className="font-breef">Copertina</h2>
          </div>
          <img className=" fix-w-200 " src={locale?.imgCopertina ? locale?.imgCopertina : ""} alt="copertina" />
        </Col>
      </Row>
      {preview && <PreviewPage />}
    </Container>
  );
}

export default BackOfficeLocalePage;
