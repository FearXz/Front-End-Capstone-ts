import { Button, Card } from "react-bootstrap";
import { GetUtenteResponse } from "../../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { format } from "date-fns";

function UtenteOrdini() {
  const myProfile: GetUtenteResponse | null = useSelector((state: RootState) => state.utente.myProfile);
  const ordini = myProfile?.ordini;

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
              <Button className="rounded-0 btn btn-leaf-500 button-border-success text-white">CONFERMA CONSEGNA</Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default UtenteOrdini;
