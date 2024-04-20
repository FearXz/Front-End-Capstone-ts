import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { GetBoLocaleIdResponse, LocalStatusDto } from "../../../../interfaces/interfaces";

import { useRef, useState } from "react";
import LocalMainModal from "./BackOfficeLocalePage/LocalMainModal";
import LocalDayOffModal from "./BackOfficeLocalePage/LocalDayOffModal";
import LocalTagCategoriesModal from "./BackOfficeLocalePage/LocalTagCategoriesModal";
import { updateCopertina, updateLogo, updateStatus } from "../../../../redux/actions/backofficeAction";

function BackOfficeLocalePage() {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const copertinaInputRef = useRef<HTMLInputElement>(null);

  const dispatch: AppDispatch = useDispatch();

  const [mainModalShow, setMainModalShow] = useState(false);
  const showMain = () => setMainModalShow(true);
  const closeMain = () => setMainModalShow(false);

  const [dayOffModalShow, setDayOffModalShow] = useState(false);
  const closeDayOff = () => setDayOffModalShow(false);
  const showDayOff = () => setDayOffModalShow(true);

  const [categoriesModalShow, setCategoriesModalShow] = useState(false);
  const closeCategories = () => setCategoriesModalShow(false);
  const showCategories = () => setCategoriesModalShow(true);

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("logo", e.target.files[0]);

      dispatch(updateLogo(formData, locale?.idRistorante as number));
    }
  }
  function handleCopertina(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("copertina", e.target.files[0]);

      dispatch(updateCopertina(formData, locale?.idRistorante as number));
    }
  }
  function handleStatus() {
    const newStatus: LocalStatusDto = {
      idRistorante: locale?.idRistorante as number,
      isAttivo: !locale?.isAttivo,
    };

    dispatch(updateStatus(newStatus));
  }

  return (
    <Container>
      {mainModalShow && <LocalMainModal show={mainModalShow} handleClose={closeMain} />}
      {dayOffModalShow && <LocalDayOffModal show={dayOffModalShow} handleClose={closeDayOff} />}
      {categoriesModalShow && <LocalTagCategoriesModal show={categoriesModalShow} handleClose={closeCategories} />}
      <Row>
        <Col xs={1} className="d-flex align-items-center">
          {locale &&
            (locale.isAttivo ? (
              <i className="bi bi-shield-check fs-3 hover" onClick={handleStatus}></i>
            ) : (
              <i className="bi bi-shield-x fs-3 hover" onClick={handleStatus}></i>
            ))}
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
            <i className="bi bi-pencil-square fs-4 hover me-2" onClick={() => showCategories()}></i>
            <h2 className="font-breef">Tag Categorie </h2>
          </div>
          <p className=" fs-5">{locale?.categorieRistorante.map((c) => c.nomeCategoria + " ")}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i
              className="bi bi-pencil-square fs-4 hover me-2"
              onClick={() => {
                logoInputRef.current?.click();
              }}
            ></i>
            <h2 className="font-breef">Logo </h2>
          </div>
          <img className=" fix-h-80 fix-w-80" src={locale?.imgLogo ? locale?.imgLogo : ""} alt="logo" />
        </Col>
        <Col xs={12} lg={6} className=" ">
          <div className="d-flex align-items-center">
            <i
              className="bi bi-pencil-square fs-4 hover me-2"
              onClick={() => {
                copertinaInputRef.current?.click();
              }}
            ></i>
            <h2 className="font-breef">Copertina</h2>
          </div>
          <img className=" fix-w-200 " src={locale?.imgCopertina ? locale?.imgCopertina : ""} alt="copertina" />
        </Col>
        <input accept="image/*" type="file" hidden ref={logoInputRef} onChange={handleLogo} />
        <input accept="image/*" type="file" hidden ref={copertinaInputRef} onChange={handleCopertina} />
      </Row>
    </Container>
  );
}

export default BackOfficeLocalePage;
