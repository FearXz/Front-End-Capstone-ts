import { Button, Card } from "react-bootstrap";
import { GetUtenteResponse } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { format } from "date-fns";
import { confirmOrder } from "../../../../redux/actions/utenteAction";
import { useRef, useState } from "react";

function AziendaDashboard() {
  const dispatch: AppDispatch = useDispatch();
  const myProfile: GetUtenteResponse | null = useSelector((state: RootState) => state.utente.myProfile);
  const ordini = [...(myProfile?.ordini || [])].reverse();

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
      <div className="" style={{ minHeight: "700px" }}>
        {currentOrders &&
          currentOrders.map((ordine, index) => (
            <Card key={`ordini-` + index} className="rounded-0 mb-3">
              <Card.Header as="h5">No. {ordine.idOrdini}</Card.Header>
              <Card.Body>
                <Card.Title>{ordine.nomeRistorante}</Card.Title>
                <Card.Text>
                  {`${format(new Date(ordine.dataOrdine), "dd/MM/yyyy")} - ${ordine.orarioConsegnaPrevista}`}
                  <br />
                  Prezzo totale: {ordine.totaleOrdine} €
                </Card.Text>
                {ordine.isOrdineConsegnato ? (
                  <p className="mb-0 text-leaf-500">ORDINE CONFERMATO</p>
                ) : ordine.isOrdineEvaso ? (
                  <div>
                    <p className="text-danger">ORDINE IN CONSEGNA</p>
                    <Button
                      className="rounded-0 btn btn-leaf-500 button-border-success text-white"
                      onClick={() => dispatch(confirmOrder(ordine.idOrdini))}
                    >
                      CONFERMA CONSEGNA
                    </Button>{" "}
                  </div>
                ) : (
                  <p className="mb-0 text-danger">ORDINE IN ATTESA</p>
                )}
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

export default AziendaDashboard;
