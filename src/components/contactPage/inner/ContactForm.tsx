import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { AppDispatch } from "../../../redux/store/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function ContactForm() {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <section className="bg-gray">
      <Container>
        <Row className="text-center py-5">
          <Col className="col-12">
            <h2 className="font-breef">Contattaci</h2>
          </Col>
        </Row>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
          <Row>
            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingNameRegister" label="Nome*">
                <Form.Control
                  {...register("nome", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.nome && <p className="text-danger">Il Nome è obbligatorio</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingCognomeRegister" label="Cognome*">
                <Form.Control
                  {...register("cognome", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.cognome && <p className="text-danger">Il Cognome è obbligatorio</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingCellulareRegister" label="Cellulare*">
                <Form.Control
                  {...register("cellulare", {
                    required: "Numero di cellulare obbligatorio",
                    pattern: { value: /^[0-9]{10}$/, message: "Numero di Cellulare non è valido" },
                  })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.cellulare && <p className="text-danger">{errors.cellulare.message as string}</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingEmailRegister" label="Email*">
                <Form.Control
                  {...register("email", {
                    required: `L'Email è obbligatoria`,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Formato Email non valido ",
                    },
                  })}
                  className="rounded-0 focus"
                  type="email"
                  placeholder=""
                />
                {errors.email && <p className="text-danger">{errors.email.message as string}</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingIndirizzoRegister" label="Indirizzo*">
                <Form.Control
                  {...register("indirizzo", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.indirizzo && <p className="text-danger">L'indirizzo è obbligatorio</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} xl={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="floatingCittaRegister" label="Citta*">
                <Form.Control
                  {...register("citta", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.citta && <p className="text-danger">La Città è obbligatoria</p>}
              </FloatingLabel>
            </Col>
            <Col xs={12} className="form-floating mb-3  ">
              <FloatingLabel controlId="floatingCittaRegister" label="Lasciaci un messaggio*">
                <Form.Control
                  {...register("messaggio", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  style={{ height: "150px" }}
                  as={"textarea"}
                  placeholder=""
                />
                {errors.messaggio && <p className="text-danger">Il messaggio è obbligatorio</p>}
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center my-5">
              <Button type="submit" className="btn btn-leaf-500 text-white rounded-0 button-border-success fw-semibold">
                INVIA
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
}

export default ContactForm;
