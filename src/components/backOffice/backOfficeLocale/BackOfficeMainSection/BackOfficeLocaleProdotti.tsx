import { Dropdown, Form, Row } from "react-bootstrap";
import { GetBoLocaleIdResponse } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { useEffect, useState } from "react";
import { ATTIVATI, DISATTIVATI, TUTTI } from "../../../../functions/config";
import { GetProdottiRistorante } from "../../../../redux/actions/backofficeAction";

function BackOfficeLocaleProdotti() {
  const dispatch: AppDispatch = useDispatch();

  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const listaProdotti = useSelector((state: RootState) => state.backoffice.listaProdotti);

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(TUTTI);

  const filteredLista = listaProdotti?.filter(
    (prod) =>
      prod.nomeProdotto.toLowerCase().includes(searchValue.toLowerCase()) &&
      (statusFilter === TUTTI || (statusFilter === ATTIVATI ? prod.isAttivo : !prod.isAttivo))
  );

  const [showCreateIng, setShowCreateIng] = useState<boolean>(false);
  const handleClose = () => setShowCreateIng(false);
  const handleShow = () => setShowCreateIng(true);

  function handleStatusFilter(status: string) {
    setStatusFilter(status);
  }

  useEffect(() => {
    if (locale) dispatch(GetProdottiRistorante(locale?.idRistorante as number));
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
          placeholder="Cerca Prodotto"
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
      <Row>{/* MAP PRODOTTI */}</Row>
    </div>
  );
}

export default BackOfficeLocaleProdotti;
