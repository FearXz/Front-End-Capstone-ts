import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store/store";
import { useForm } from "react-hook-form";
import { Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { CreateIngredientDto } from "../../../../../interfaces/interfaces";
import { newIngredientiPost } from "../../../../../redux/actions/backofficeAction";

interface ModalCreaIngredienteProps {
  show: boolean;
  handleClose: () => void;
  localeId: number;
}

function ModalCreaIngrediente(props: ModalCreaIngredienteProps) {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIngredientDto>();

  async function onSubmit(data: CreateIngredientDto) {
    const newIngredientDto: CreateIngredientDto = {
      localeId: props.localeId,
      nomeIngrediente: data.nomeIngrediente,
      prezzoIngrediente: data.prezzoIngrediente,
      isAttivo: true,
    };
    console.log(newIngredientDto);

    dispatch(newIngredientiPost(newIngredientDto));
    props.handleClose();
  }

  return (
    <div>
      {" "}
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Crea Ingrediente</Modal.Title>
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
                  {errors.prezzoIngrediente && (
                    <p className="text-danger"> Il prezzo dell'ingrediente è obbligatorio </p>
                  )}
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
                  CREA
                </button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalCreaIngrediente;
