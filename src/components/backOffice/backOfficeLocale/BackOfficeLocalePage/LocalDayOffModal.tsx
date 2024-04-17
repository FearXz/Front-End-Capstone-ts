import { useDispatch, useSelector } from "react-redux";
import { GetBoLocaleIdResponse, GiorniDiChiusura, GiorniDiChiusuraDto } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getGiorniDiChiusura, putGiorniChiusura } from "../../../../redux/actions/backofficeAction";

interface LocalDayOffModalProps {
  show: boolean;
  handleClose: () => void;
}
function LocalDayOffModal(props: LocalDayOffModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const listaChiusura: GiorniDiChiusura[] = useSelector((state: RootState) => state.backoffice.listaGiorniDiChiusura);

  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const giorniDiChiusura: GiorniDiChiusura[] = locale?.giorniDiChiusura ? locale.giorniDiChiusura : [];

  const [newDayOff, setNewDayOff] = useState<GiorniDiChiusura[]>(giorniDiChiusura ? giorniDiChiusura : []);

  let giorniOrdinati = [...listaChiusura];
  const rifOrdine = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdi", "Sabato", "Domenica"];

  giorniOrdinati = [...listaChiusura].sort((a, b) => rifOrdine.indexOf(a.nomeGiorno) - rifOrdine.indexOf(b.nomeGiorno));
  console.log(newDayOff);

  const handleToggle = (giorno: GiorniDiChiusura) => {
    setNewDayOff((prevDayOff) => {
      const isDayOff = prevDayOff.some((day) => day.idGiorniChiusura === giorno.idGiorniChiusura);
      if (isDayOff) {
        return prevDayOff.filter((day) => day.idGiorniChiusura !== giorno.idGiorniChiusura);
      } else {
        return [...prevDayOff, giorno];
      }
    });
  };

  function handleDayOffSubmit() {
    const dayOffDto: GiorniDiChiusuraDto = {
      idRistorante: locale?.idRistorante ? locale.idRistorante : 0,
      idGiorniChiusura: newDayOff.map((day) => day?.idGiorniChiusura || 0),
    };
    console.log(dayOffDto);
    dispatch(putGiorniChiusura(dayOffDto));
  }

  useEffect(() => {
    dispatch(getGiorniDiChiusura());
  }, [locale]);

  return (
    <div>
      {" "}
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Giorni di Chiusura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {giorniOrdinati?.map((giorno, index) => (
            <div key={"dayoption-" + index}>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label={giorno.nomeGiorno}
                checked={newDayOff.some((day) => day.idGiorniChiusura === giorno.idGiorniChiusura)}
                onChange={() => handleToggle(giorno)}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className=" justify-content-between">
          <Col>
            <div className="rounded-0 text-white btn btn-gray-500 button-border-gray" onClick={props.handleClose}>
              CHIUDI
            </div>
          </Col>
          <Col className="text-end">
            <button
              className="rounded-0 text-white btn btn-leaf-500 button-border-success"
              onClick={handleDayOffSubmit}
            >
              MODIFICA
            </button>
          </Col>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LocalDayOffModal;
