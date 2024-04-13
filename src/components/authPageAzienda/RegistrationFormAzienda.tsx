import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { registerAziendaPost } from "../../redux/actions/authAction";
import { RegisterAziendaDto } from "../../interfaces/interfaces";
import { AppDispatch } from "../../redux/store/store";

function RegistrationFormAzienda() {
  const navigate: NavigateFunction = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterAziendaDto>();

  async function onSubmit(data: RegisterAziendaDto) {
    const registerObj: RegisterAziendaDto = {
      email: data.email,
      password: data.password,
      nomeAzienda: data.nomeAzienda,
      partitaIva: data.partitaIva,
      telefono: data.telefono,
      indirizzo: data.indirizzo,
      citta: data.citta,
      cap: data.cap,
    };

    dispatch(registerAziendaPost(registerObj, navigate));

    console.log(data);
  }
  return (
    <Col xs={12} md={6} className=" bg-gray py-7" id="col-registration-form">
      <Row>
        <Col xs={12} lg={10} className="  offset-lg-1   text-center">
          <h2 className="h1 font-breef">Registrati</h2>
          <Link className="link" to={"/auth/login"}>
            Sei un privato ? clicca qui !
          </Link>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
            <Row>
              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingNameRegister" label="Nome Azienda*" className="mb-3">
                  <Form.Control
                    {...register("nomeAzienda", { required: true })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.nomeAzienda && <p className="text-danger">Il Nome dell'azienda è obbligatorio</p>}
                </FloatingLabel>
              </Col>

              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingCognomeRegister" label="Partita Iva*">
                  <Form.Control
                    {...register("partitaIva", {
                      required: "La Partita iva è obbligatoria",
                      pattern: {
                        value: /^\d{11}$/,
                        message: "La Partita IVA deve essere di 11 numeri",
                      },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.partitaIva && <p className="text-danger">{errors.partitaIva.message as string}</p>}
                </FloatingLabel>
              </Col>

              <Col xs={12} xxl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingCellulareRegister" label="Cellulare*">
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

              <Col xs={12} xxl={6} className="form-floating mb-3 ">
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
                <FloatingLabel controlId="floatingPasswordRegister" label="Password*">
                  <Form.Control
                    {...register("password", { required: true })}
                    className="rounded-0 focus"
                    type="password"
                    placeholder=""
                  />
                  {errors.password && <p className="text-danger">La Password è obbligatoria</p>}
                </FloatingLabel>
              </Col>

              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingConfermaPasswordRegister" label="Conferma Password*">
                  <Form.Control
                    {...register("confermaPassword", {
                      required: "Devi confermare la password",
                      validate: (value) => value === getValues("password") || "Le password non corrispondono",
                    })}
                    className="rounded-0 focus"
                    type="password"
                    placeholder=""
                  />
                  {errors.confermaPassword && (
                    <p className="text-danger">{errors.confermaPassword.message as string}</p>
                  )}
                </FloatingLabel>
              </Col>

              <Col xs={12} className="form-floating mb-3 ">
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

              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingCAPRegister" label="CAP*">
                  <Form.Control
                    {...register("cap", {
                      required: "Il CAP è obbligatorio",
                      pattern: { value: /^[0-9]{5}$/, message: "Il Formato del CAP non è valido" },
                    })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.cap && <p className="text-danger">{errors.cap.message as string}</p>}
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center pt-6">
                <Button
                  type="submit"
                  className="btn btn-leaf-500 text-white rounded-0 button-border-success fw-semibold"
                >
                  REGISTRATI
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}

export default RegistrationFormAzienda;
