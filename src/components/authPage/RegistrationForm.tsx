import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerPost } from "../../redux/actions/authAction";

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function onSubmit(data) {
    const registerObj = {
      email: data.email,
      password: data.password,
      nome: data.nome,
      cognome: data.cognome,
      cellulare: data.cellulare,
      indirizzo: data.indirizzo,
      citta: data.citta,
      cap: data.cap,
    };

    dispatch(registerPost(registerObj, navigate));

    console.log(data);
  }
  return (
    <Col xs={12} md={6} className=" bg-gray py-7" id="col-registration-form">
      <Row>
        <Col xs={12} lg={10} className="  offset-lg-1   text-center">
          <h2 className="h1 font-breef">Registrati</h2>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
            <Row>
              <Col xs={12} xl={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="floatingNameRegister" label="Nome*" className="mb-3">
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

              <Col xs={12} xxl={6} className="form-floating mb-3 ">
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
                  {errors.cellulare && <p className="text-danger">{errors.cellulare.message}</p>}
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
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
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
                  {errors.confermaPassword && <p className="text-danger">{errors.confermaPassword.message}</p>}
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
                  {errors.cap && <p className="text-danger">{errors.cap.message}</p>}
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

export default RegistrationForm;
