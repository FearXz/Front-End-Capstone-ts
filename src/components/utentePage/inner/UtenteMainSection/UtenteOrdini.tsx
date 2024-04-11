import { Button, Card } from "react-bootstrap";
import { GetUtenteResponse } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { format } from "date-fns";
import { confirmOrder } from "../../../../redux/actions/utenteAction";

function UtenteOrdini() {
  const dispatch: AppDispatch = useDispatch();
  const myProfile: GetUtenteResponse | null = useSelector((state: RootState) => state.utente.myProfile);
  const ordini = [...(myProfile?.ordini || [])].reverse();

  return (
    <div className="mt-3">
      {ordini &&
        ordini.map((ordine, index) => (
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
  );
}

export default UtenteOrdini;
