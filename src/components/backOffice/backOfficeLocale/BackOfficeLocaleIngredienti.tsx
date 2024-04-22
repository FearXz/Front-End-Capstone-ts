import { useEffect, useState } from "react";
import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { ATTIVATI, DISATTIVATI, TUTTI } from "../../../functions/config";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { GetBoLocaleIdResponse, IngredientiProdottiLocale } from "../../../interfaces/interfaces";
import { GetIngredientiRistorante } from "../../../redux/actions/backofficeAction";
import ModalCreaIngrediente from "./BackOfficeMainSection/BackOfficeLocaleIngredienti/ModalCreaIngrediente";

function BackOfficeLocaleIngredienti() {
  const dispatch: AppDispatch = useDispatch();

  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const listaIngredienti: IngredientiProdottiLocale[] | null = useSelector(
    (state: RootState) => state.backoffice.listaIngredienti
  );
  console.log(listaIngredienti);

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(ATTIVATI);

  const [selectedEdit, setSelectedEdit] = useState<IngredientiProdottiLocale | null>(null);

  const [showCreateIng, setShowCreateIng] = useState<boolean>(false);
  const handleClose = () => setShowCreateIng(false);
  const handleShow = () => setShowCreateIng(true);

  const filteredLista = listaIngredienti?.filter(
    (ing) =>
      ing.nomeIngrediente.toLowerCase().includes(searchValue.toLowerCase()) &&
      (statusFilter === TUTTI || (statusFilter === ATTIVATI ? ing.isAttivo : !ing.isAttivo))
  );
  function handleStatusFilter(status: string) {
    setStatusFilter(status);
  }
  function handleEdit(ing: IngredientiProdottiLocale) {
    setSelectedEdit(ing);
  }

  useEffect(() => {
    if (locale) dispatch(GetIngredientiRistorante(locale?.idRistorante as number));
  }, [locale]);

  return (
    <div className="mt-3 mb-5 h-100">
      <div className="mb-3 d-flex align-item-center">
        <button className="btn btn-leaf-500 text-white button-border-success rounded-0" onClick={handleShow}>
          {" "}
          Crea
        </button>
        <Form.Control
          className="rounded-0 fix-h-50  my-input focus"
          type="text"
          placeholder="Cerca Ordine"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Dropdown className="d-flex align-item-center">
          <Dropdown.Toggle className="btn btn-leaf-500 text-white button-border-success rounded-0" id="dropdown-basic">
            Filtro
          </Dropdown.Toggle>
          <Dropdown.Menu className="rounded-0 ">
            <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(TUTTI)}>
              TUTTI
            </Dropdown.Item>
            <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(ATTIVATI)}>
              ATTIVATI
            </Dropdown.Item>
            <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(DISATTIVATI)}>
              DISATTIVATI
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row>
        {locale && showCreateIng && (
          <ModalCreaIngrediente localeId={locale?.idRistorante} show={showCreateIng} handleClose={handleClose} />
        )}
        {filteredLista &&
          filteredLista.map((ing: IngredientiProdottiLocale, index: number) => (
            <Col xs={12} md={6} lg={4} xxl={3} key={`ing-${index}`} className="mb-3">
              <Card className=" rounded-0">
                <Card.Body>
                  <div className=" d-flex justify-content-between align-item-center mb-1"></div>
                  <Card.Title className="fs-6 d-flex justify-content-between">
                    <div>{ing.nomeIngrediente}</div>
                    <div>
                      <i className="bi bi-pencil-square hover " onClick={() => handleEdit(ing)}></i>
                    </div>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default BackOfficeLocaleIngredienti;
