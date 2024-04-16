import { Button, Card, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { BoOrdiniLocaleId, GetBoLocaleIdResponse } from "../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { setSelectedOrderModal } from "../../../redux/reducers/backofficeReducer";
import ModalOrderDetail from "./BackOfficeLocaleOrdini/ModalOrderDetail";
import { confirmEvaso } from "../../../redux/actions/backofficeAction";

function BackOfficeLocaleOrdini() {
  const dispatch: AppDispatch = useDispatch();
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const [search, setSearch] = useState<string>("");
  const filteredOrdini = locale?.ordini?.filter(
    (ordini) =>
      ordini.utente.nome.toLowerCase().includes(search.toLowerCase()) ||
      ordini.utente.cognome.toLowerCase().includes(search.toLowerCase()) ||
      ordini.idOrdini.toString().includes(search)
  );
  const ordini = [...(filteredOrdini || [])].reverse();

  // Aggiungi stato per la pagina corrente
  const [selectPage, setSelectPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const inputSelectPage = useRef<HTMLInputElement>(null);
  const ordersPerPage = 3;
  // Calcola gli ordini per la pagina corrente
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordini.slice(indexOfFirstOrder, indexOfLastOrder);
  // Calcola il numero totale di pagine
  const totalPages = Math.ceil(ordini.length / ordersPerPage);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    dispatch(setSelectedOrderModal(null));
    setShow(false);
  };
  const handleShow = (ordini: BoOrdiniLocaleId) => {
    dispatch(setSelectedOrderModal(ordini));
    setShow(true);
  };

  function handleSelectPageClick() {
    setSelectPage(true);
    setTimeout(() => {
      inputSelectPage.current?.focus();
    }, 100);
  }

  function handleSelectPage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const newPage: number = parseInt(e.currentTarget.value);
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        setSelectPage(false);
      } else if (newPage > totalPages) {
        setCurrentPage(totalPages);
        setSelectPage(false);
      }
    }
  }

  return (
    <div className="mt-3 mb-5 h-100">
      <ModalOrderDetail show={show} handleClose={handleClose} />
      <div className="mb-3">
        <Form.Control
          className="rounded-0 fix-h-50  my-input focus"
          type="text"
          placeholder="Cerca Ordine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="" style={{ minHeight: "750px" }}>
        {currentOrders &&
          currentOrders.map((ordine, index) => (
            <Card key={`ordini-` + index} className="rounded-0 mb-3">
              <Card.Header as="h5" className="d-flex justify-content-between">
                <div>No. {ordine.idOrdini}</div>
                <div className="cursor-pointer">
                  <i className="bi bi-card-list" onClick={() => handleShow(ordine)}></i>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  Da: {ordine.utente.nome} {ordine.utente.cognome}
                </Card.Title>
                <Row>
                  <div className="col-5">
                    {`${format(new Date(ordine.dataOrdine), "dd/MM/yyyy")} - ${ordine.orarioConsegnaPrevista}`}
                    <br />
                    <p> Prezzo: {ordine.totaleOrdine} €</p>
                    {ordine.isOrdineConsegnato ? (
                      <p className="mb-0 text-leaf-500">ORDINE COMPLETATO</p>
                    ) : ordine.isOrdineEvaso ? (
                      <div>
                        <p className="mb-0 text-danger">ORDINE IN CONSEGNA</p>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-0 text-leaf-500">ORDINE PAGATO</p>
                        <Button
                          className="rounded-0 btn btn-leaf-500 button-border-success text-white"
                          onClick={() => dispatch(confirmEvaso(ordine.idOrdini, locale && locale?.idRistorante))}
                        >
                          ORDINE PRONTO
                        </Button>{" "}
                      </div>
                    )}
                  </div>
                  <div className="col-7">{ordine.indirizzoConsegna}</div>
                </Row>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="d-flex justify-content-center align-items-center fs-5 ">
        <button
          className="btn btn-leaf-500 rounded-0 button-border-success text-white"
          onClick={() => setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))}
        >
          Previous
        </button>
        {!selectPage ? (
          <p className="mb-0 px-1 mx-3 cursor-pointer border border-black" onClick={handleSelectPageClick}>
            {currentPage} / {totalPages}
          </p>
        ) : (
          <div className="mx-2">
            <input
              type="number"
              ref={inputSelectPage}
              min={1}
              max={totalPages}
              onKeyDown={handleSelectPage}
              className="fix-w-50 "
            />
            /{totalPages}
          </div>
        )}
        <button
          className="btn btn-leaf-500 rounded-0 button-border-success text-white px-5"
          onClick={() => setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BackOfficeLocaleOrdini;
