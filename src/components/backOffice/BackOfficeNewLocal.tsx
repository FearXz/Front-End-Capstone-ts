import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { NewLocalDto, OSMResponse } from "../../interfaces/interfaces";
import { toast } from "react-toastify";
import { newLocalPost } from "../../redux/actions/backofficeAction";

function BackOfficeNewLocal() {
  const dispatch: AppDispatch = useDispatch();
  const provider = new OpenStreetMapProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLocalDto>();

  async function onSubmit(data: NewLocalDto) {
    const newLocal: NewLocalDto = {
      nomeRistorante: data.nomeRistorante,
      tagRistorante: data.tagRistorante,
      telefono: data.telefono,
      descrizione: data.descrizione,
      oraApertura: data.oraApertura,
      oraChiusura: data.oraChiusura,
      indirizzo: data.indirizzo || "",
      citta: data.citta || "",
      cap: data.cap || "",
      latitudine: "",
      longitudine: "",
    };

    const results: OSMResponse[] = await provider.search({
      query: data.indirizzo + ", " + data.citta + ", " + data.cap,
    });
    console.log(results);

    if (results.length > 0) {
      newLocal.latitudine = results[0].y.toString();
      newLocal.longitudine = results[0].x.toString();
      console.log(newLocal);
    } else {
      toast.error("Indirizzo non trovato");
      return;
    }

    dispatch(newLocalPost(newLocal));
  }

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1 className=" text-center font-breef">Aggiungi Locale</h1>
          </Col>
        </Row>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 mb-3 ">
          <Row>
            <Col xs={12} lg={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="ristorante" label="Nome Ristorante*" className="">
                <Form.Control
                  {...register("nomeRistorante", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.nomeRistorante && <p className="text-danger">Il Nome del ristorante è obbligatorio</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} lg={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="Tag" label="Tag Ristorante*">
                <Form.Control
                  {...register("tagRistorante", {
                    required: false,
                  })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.tagRistorante && <p className="text-danger">{errors.tagRistorante.message as string}</p>}
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
              <div className="rounded-0 text-white btn btn-gray-500 button-border-gray">INDIETRO</div>
            </Col>
            <Col className="text-end">
              <button className="rounded-0 text-white btn btn-leaf-500 button-border-success" type="submit">
                CREA NUOVO LOCALE
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </main>
  );
}

export default BackOfficeNewLocal;
