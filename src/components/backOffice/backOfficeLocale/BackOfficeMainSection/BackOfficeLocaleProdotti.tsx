import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { GetBoLocaleIdResponse, ProdottiLocale } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { useEffect, useState } from "react";
import { ATTIVATI, DISATTIVATI, TUTTI } from "../../../../functions/config";
import { GetProdottiRistorante } from "../../../../redux/actions/backofficeAction";

function BackOfficeLocaleProdotti() {
  const dispatch: AppDispatch = useDispatch();

  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const listaProdotti: ProdottiLocale[] | null = useSelector((state: RootState) => state.backoffice.listaProdotti);

  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(TUTTI);

  const filteredLista = listaProdotti
    ? listaProdotti?.filter(
        (prod) =>
          prod.nomeProdotto.toLowerCase().includes(searchValue.toLowerCase()) &&
          (statusFilter === TUTTI || (statusFilter === ATTIVATI ? prod.isAttivo : !prod.isAttivo))
      )
    : [];

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
        <button className="btn btn-leaf-500 text-white button-border-success rounded-0"> Crea</button>
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
      <Row>
        {/* MAP PRODOTTO */}
        {filteredLista &&
          filteredLista.map((prodotto, index: number) => (
            <Col key={`prodotto-${index}`} className="col-xxl-6 col-12 py-md-3 py-2 ">
              <div className="shadow h-100 p-md-3 p-2 ">
                <Row>
                  <Col className={prodotto.imgProdotto ? "col-sm-4 col-12 d-flex align-item-center" : "d-none"}>
                    <div className="" style={{ position: "relative", width: "100%", paddingBottom: "50%" }}>
                      <img
                        src={
                          prodotto.imgProdotto
                            ? prodotto.imgProdotto
                            : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                        }
                        alt={prodotto.nomeProdotto}
                        className=" w-100 h-100 rounded-3 object-fit-cover position-absolute"
                      />
                    </div>
                  </Col>
                  <Col className={prodotto.imgProdotto ? "col-sm-8 col-12 mt-sm-0 mt-3" : "col-12 mt-sm-0 mt-3"}>
                    <Row className=" product-info-container">
                      <Col className="col-8 d-flex flex-sm-nowrap flex-wrap">
                        <h4 className="h5 mb-0 fw-semibold">{prodotto.nomeProdotto}</h4>
                      </Col>
                      <Col className="col-4 text-end ">
                        <strong className="fw-semibold h5">€&nbsp;{prodotto.prezzoProdotto}</strong>
                      </Col>
                    </Row>
                    <div className="row">
                      <div className="col-12">
                        <em className="">
                          {prodotto?.ingredienti.map(
                            (ingrediente, index) =>
                              `${ingrediente.nomeIngrediente}${index < prodotto.ingredienti.length - 1 ? "," : "."} `
                          )}
                        </em>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        {/* FINE MAP PRODOTTO */}
      </Row>
    </div>
  );
}

export default BackOfficeLocaleProdotti;
