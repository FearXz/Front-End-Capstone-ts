import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface FormData {
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  indirizzo: string;
  citta: string;
  cap: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

function UtenteProfilo() {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const accountDetails = {
      email: data.email,
    };

    console.log(data);
  }

  function toggleInputPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckbox(e.currentTarget.checked);
  }
  return (
    <div>
      <h2 className=" font-breef"> Il tuo profilo</h2>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              {...register("nome", {
                required: `Il nome è obbligatorio`,
                pattern: {
                  value: /^[A-Za-z]{2,}$/,
                  message: "Formato nome non valido ",
                },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="Nome"
            />
            {errors?.nome?.message && <p className="text-danger">{errors.nome.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              {...register("cognome", {
                required: `Il cognome è obbligatorio`,
                pattern: {
                  value: /^[A-Za-z]{2,}$/,
                  message: "Formato cognome non valido ",
                },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="Cognome"
            />
            {errors?.cognome?.message && <p className="text-danger">{errors.cognome.message as string}</p>}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Email</Form.Label>
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
              placeholder="Email"
            />
            {errors?.email?.message && <p className="text-danger">{errors.email.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Cellulare</Form.Label>
            <Form.Control
              {...register("cellulare", {
                required: "Numero di cellulare obbligatorio",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Numero di Cellulare non è valido",
                },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="Cellulare"
            />
            {errors?.cellulare?.message && <p className="text-danger">{errors.cellulare.message as string}</p>}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              {...register("indirizzo", { required: true })}
              className="rounded-0 focus"
              type="text"
              placeholder="Indirizzo"
            />
            {errors?.indirizzo?.message && <p className="text-danger">{errors.indirizzo.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Citta</Form.Label>
            <Form.Control
              {...register("citta", { required: true })}
              className="rounded-0 focus"
              type="text"
              placeholder="Citta"
            />
            {errors?.citta?.message && <p className="text-danger">{errors.citta.message as string}</p>}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>CAP</Form.Label>
            <Form.Control
              {...register("cap", {
                required: "Il CAP è obbligatorio",
                pattern: { value: /^[0-9]{5}$/, message: "Il Formato del CAP non è valido" },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="CAP"
            />
            {errors?.cap?.message && <p className="text-danger">{errors.cap.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 d-flex align-items-center">
            <div className="mt-5">
              <input type="checkbox" onChange={toggleInputPassword} /> Cambia Password
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="pt-3">
            <Button type="submit" className="rounded-0 btn btn-leaf-500 text-white button-border-success fw-semibold">
              SALVA
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UtenteProfilo;
