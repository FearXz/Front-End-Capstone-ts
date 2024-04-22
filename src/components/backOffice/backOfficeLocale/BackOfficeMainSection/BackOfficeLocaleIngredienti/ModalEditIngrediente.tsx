import { Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { AppDispatch } from "../../../../../redux/store/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { IngredientiProdottiLocale, UpdateIngredientDto } from "../../../../../interfaces/interfaces";
import { updateIngredientiPut } from "../../../../../redux/actions/backofficeAction";
import { useEffect } from "react";

interface ModalEditIngredienteProps {
  show: boolean;
  handleClose: () => void;
  localeId: number;
  ingrediente: IngredientiProdottiLocale | null;
}

function ModalEditIngrediente(props: ModalEditIngredienteProps) {
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateIngredientDto>();

  async function onSubmit(data: UpdateIngredientDto) {
    const editIngredientDto: UpdateIngredientDto = {
      localeId: props.localeId,
      idIngrediente: props.ingrediente?.idIngrediente as number,
      nomeIngrediente: data.nomeIngrediente,
      prezzoIngrediente: data.prezzoIngrediente,
      isAttivo: data.isAttivo,
    };
    console.log(editIngredientDto);

    dispatch(updateIngredientiPut(editIngredientDto));
    props.handleClose();
  }

  useEffect(() => {
    if (props.ingrediente) {
      setValue("nomeIngrediente", props.ingrediente.nomeIngrediente);
      setValue("prezzoIngrediente", props.ingrediente.prezzoIngrediente);
      setValue("isAttivo", props.ingrediente.isAttivo as boolean);
    }
  }, []);

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="d-flex">
            <span className="me-3"> Edit Ingrediente</span>{" "}
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              {...register("isAttivo")}
              label={props.ingrediente?.isAttivo ? "Attivo" : "Disattivo"}
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)} className="">
          <Row>
            <Col xs={12} lg={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="ristorante" label="Nome Ingrediente*" className="">
                <Form.Control
                  {...register("nomeIngrediente", { required: true })}
                  className="rounded-0 focus"
                  type="text"
                  placeholder=""
                />
                {errors.nomeIngrediente && <p className="text-danger">Il Nome dell'ingrediente è obbligatorio</p>}
              </FloatingLabel>
            </Col>

            <Col xs={12} lg={6} className="form-floating mb-3 ">
              <FloatingLabel controlId="Tag" label="Prezzo Ingrediente*">
                <Form.Control
                  {...register("prezzoIngrediente", {
                    required: true,
                  })}
                  className="rounded-0 focus"
                  type="number"
                  placeholder=""
                  min={0}
                />
                {errors.prezzoIngrediente && <p className="text-danger"> Il prezzo dell'ingrediente è obbligatorio </p>}
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
  );
}

export default ModalEditIngrediente;
