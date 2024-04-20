import { useDispatch, useSelector } from "react-redux";
import { GetBoLocaleIdResponse, LocalMainModalEditDto, OSMResponse } from "../../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { localeditmainmodal } from "../../../../../redux/actions/backofficeAction";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { toast } from "react-toastify";

interface LocalMainModalProps {
  show: boolean;
  handleClose: () => void;
}
function LocalMainModal(props: LocalMainModalProps) {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const dispatch: AppDispatch = useDispatch();
  const provider = new OpenStreetMapProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LocalMainModalEditDto>();

  async function onSubmit(data: LocalMainModalEditDto) {
    const editMainObj: LocalMainModalEditDto = {
      idRistorante: locale?.idRistorante || 0,
      ristorante: data.ristorante,
      tag: data.tag,
      telefono: data.telefono,
      descrizione: data.descrizione,
      oraApertura: data.oraApertura,
      oraChiusura: data.oraChiusura,
      indirizzo: data.indirizzo || "",
      citta: data.citta || "",
      cap: data.cap || "",
      latitudine: locale?.latitudine || "",
      longitudine: locale?.longitudine || "",
    };

    const results: OSMResponse[] = await provider.search({
      query: data.indirizzo + ", " + data.citta + ", " + data.cap,
    });
    console.log(results);

    if (results.length > 0) {
      editMainObj.latitudine = results[0].y.toString();
      editMainObj.longitudine = results[0].x.toString();
      console.log(editMainObj);
    } else {
      toast.error("Indirizzo non trovato");
      return;
    }

    dispatch(localeditmainmodal(editMainObj));
    props.handleClose();
  }

  useEffect(() => {
    setValue("ristorante", locale?.nomeRistorante || "");
    setValue("tag", locale?.tagRistorante || "");
    setValue("telefono", locale?.telefono || "");
    setValue("descrizione", locale?.descrizione || "");
    setValue("oraApertura", locale?.orarioApertura || "");
    setValue("oraChiusura", locale?.orarioChiusura || "");
    setValue("indirizzo", locale?.indirizzo || "");
    setValue("citta", locale?.citta || "");
    setValue("cap", locale?.cap || "");
  }, [locale]);

  return (
    <div>
      {" "}
      <Modal fullscreen show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Ristorante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 ">
            <Row>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="ristorante" label="Nome Ristorante*" className="">
                  <Form.Control
                    {...register("ristorante", { required: true })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.ristorante && <p className="text-danger">Il Nome del ristorante è obbligatorio</p>}
                </FloatingLabel>
              </Col>

              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="Tag" label="Tag Ristorante*">
                  <Form.Control
                    {...register("tag", {
                      required: false,
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.tag && <p className="text-danger">{errors.tag.message as string}</p>}
                </FloatingLabel>
              </Col>

              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="orarioApertura" label="OraApertura*">
                  <Form.Control
                    {...register("oraApertura", {
                      required: "Ora di Apertura obbligatoria",
                    })}
                    className="rounded-0 focus"
                    type="time"
                    placeholder=""
                  />
                  {errors.oraApertura && <p className="text-danger">{errors.oraApertura.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="OrarioChiusura" label="OraChiusura*">
                  <Form.Control
                    {...register("oraChiusura", {
                      required: " Ora di Chiusura obbligatoria",
                    })}
                    className="rounded-0 focus"
                    type="time"
                    placeholder=""
                  />
                  {errors.oraChiusura && <p className="text-danger">{errors.oraChiusura.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="Cellulare" label="Cellulare*">
                  <Form.Control
                    {...register("telefono", {
                      required: "Numero di Cellulare obbligatorio",
                      pattern: { value: /^[0-9]{10}$/, message: "Numero di Telefono non è valido" },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.telefono && <p className="text-danger">{errors.telefono.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="indirizzo" label="indirizzo*">
                  <Form.Control
                    {...register("indirizzo", {
                      required: true,
                      pattern: { value: /^[a-zA-Z0-9 ,']+$/, message: "L'inidirizzo non è valido" },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.indirizzo && <p className="text-danger">{errors.indirizzo.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="citta" label="Citta*">
                  <Form.Control
                    {...register("citta", {
                      required: true,
                      pattern: { value: /^[a-zA-Z ]+$/, message: "Il formato della città non è valido" },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.citta && <p className="text-danger">{errors.citta.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="cap" label="cap*">
                  <Form.Control
                    {...register("cap", {
                      required: true,
                      pattern: { value: /^\d{5}$/, message: "Il campo deve contenere esattamente 5 numeri" },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.cap && <p className="text-danger">{errors.cap.message as string}</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} className="form-floating mb-3 ">
                <FloatingLabel controlId="Descrizione" label="Descrizione*">
                  <Form.Control
                    {...register("descrizione", {
                      required: false,
                    })}
                    className="rounded-0 focus"
                    type="text"
                    as={"textarea"}
                    style={{ height: "200px" }}
                    placeholder=""
                  />
                  {errors.descrizione && <p className="text-danger">{errors.descrizione.message as string}</p>}
                </FloatingLabel>
              </Col>
            </Row>
            <Row className=" justify-content-between">
              <Col>
                <div className="rounded-0 text-white btn btn-gray-500 button-border-gray" onClick={props.handleClose}>
                  CHIUDI
                </div>
              </Col>
              <Col className="text-end">
                <button className="rounded-0 text-white btn btn-leaf-500 button-border-success" type="submit">
                  MODIFICA
                </button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocalMainModal;
