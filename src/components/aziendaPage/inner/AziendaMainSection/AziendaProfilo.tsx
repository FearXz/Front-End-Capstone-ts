import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { AziendaData, AziendaProfileDto } from "../../../../interfaces/interfaces";
import { updateAzienda } from "../../../../redux/actions/aziendaAction";

function AziendaProfilo() {
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const myProfile: AziendaData | null = useSelector((state: RootState) => state.azienda.myProfile);
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<AziendaProfileDto>();

  async function onSubmit(data: AziendaProfileDto) {
    let accountDetails: AziendaProfileDto = {
      nomeAzienda: data.nomeAzienda,
      partitaIva: data.partitaIva,
      email: data.email,
      telefono: data.telefono,
      indirizzo: data.indirizzo,
      citta: data.citta,
      cap: data.cap,
    };

    if (checkbox) {
      accountDetails = {
        ...accountDetails,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };
    }
    console.log(accountDetails);
    dispatch(updateAzienda(accountDetails));
  }

  function toggleInputPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckbox(e.currentTarget.checked);
  }

  useEffect(() => {
    if (myProfile) {
      setValue("nomeAzienda", myProfile.nomeAzienda);
      setValue("partitaIva", myProfile.partitaIva);
      setValue("email", myProfile.email);
      setValue("telefono", myProfile.telefono);
      setValue("indirizzo", myProfile.indirizzo);
      setValue("citta", myProfile.citta);
      setValue("cap", myProfile.cap);
    }
  }, [myProfile]);

  return (
    <div>
      <h2 className=" font-breef"> Il tuo profilo</h2>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="pt-lg-5 pt-md-4 py-3">
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              {...register("nomeAzienda", {
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
            {errors?.nomeAzienda?.message && <p className="text-danger mb-0">{errors.nomeAzienda.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Partita Iva</Form.Label>
            <Form.Control
              {...register("partitaIva", {
                required: `La Partita Iva è obbligatoria`,
                pattern: {
                  value: /^\d{11}$/,
                  message: "Formato Partita Iva non valido",
                },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="Partita Iva"
            />
            {errors?.partitaIva?.message && <p className="text-danger mb-0">{errors.partitaIva.message as string}</p>}
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
            {errors?.email?.message && <p className="text-danger mb-0">{errors.email.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Cellulare</Form.Label>
            <Form.Control
              {...register("telefono", {
                required: "Numero di telefono obbligatorio",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Numero di telefono non è valido",
                },
              })}
              className="rounded-0 focus"
              type="text"
              placeholder="Cellulare"
            />
            {errors?.telefono?.message && <p className="text-danger mb-0">{errors.telefono.message as string}</p>}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              {...register("indirizzo", { required: "L'indirizzo è obbligatorio" })}
              className="rounded-0 focus"
              type="text"
              placeholder="Indirizzo"
            />
            {errors?.indirizzo?.message && <p className="text-danger mb-0">{errors.indirizzo.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 ">
            <Form.Label>Citta</Form.Label>
            <Form.Control
              {...register("citta", { required: "La Città è obbligatoria" })}
              className="rounded-0 focus"
              type="text"
              placeholder="Citta"
            />
            {errors?.citta?.message && <p className="text-danger mb-0">{errors.citta.message as string}</p>}
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
            {errors?.cap?.message && <p className="text-danger mb-0">{errors.cap.message as string}</p>}
          </Col>
          <Col xs={12} sm={6} className="mb-3 d-flex align-items-center">
            <div className="mt-5">
              <input type="checkbox" onChange={toggleInputPassword} /> Cambia Password
            </div>
          </Col>
        </Row>
        {checkbox && (
          <Row>
            <Col xs={12} sm={6} className="mb-3 ">
              <Form.Label>Vecchia Password</Form.Label>
              <Form.Control
                {...register("oldPassword", { required: true })}
                className="rounded-0 focus"
                type="password"
                placeholder="Old Password"
              />
              {errors.oldPassword && <p className="text-danger mb-0">La Password è obbligatoria</p>}
            </Col>
            <Col xs={12} sm={6} className="mb-3 d-flex align-items-center"></Col>
            <Col xs={12} sm={6} className="mb-3 ">
              <Form.Label>Nuova Password</Form.Label>
              <Form.Control
                {...register("newPassword", { required: true })}
                className="rounded-0 focus"
                type="password"
                placeholder="Nuova Password"
              />
              {errors.newPassword && <p className="text-danger mb-0">La Password è obbligatoria</p>}
            </Col>
            <Col xs={12} sm={6} className="mb-3 ">
              <Form.Label>Conferma nuova Password</Form.Label>
              <Form.Control
                {...register("confirmNewPassword", {
                  required: "Devi confermare la password",
                  validate: (value) => value === getValues("newPassword") || "Le password non corrispondono",
                })}
                className="rounded-0 focus"
                type="password"
                placeholder="Conferma Password"
              />
              {errors.confirmNewPassword && <p className="text-danger mb-0">{errors.confirmNewPassword.message}</p>}
            </Col>
          </Row>
        )}
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

export default AziendaProfilo;
