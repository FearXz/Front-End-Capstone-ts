import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { useForm } from "react-hook-form";
import { Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetIngredientiRistorante, GetListaTipi } from "../../../../../redux/actions/backofficeAction";
import {
  EditProductDto,
  GetTipoProdottoResponse,
  IngredientiProdottiLocale,
  ProdottiLocale,
} from "../../../../../interfaces/interfaces";

interface ModalEditProdottoProps {
  show: boolean;
  handleClose: () => void;
  idRistorante: number;
  prodotto: ProdottiLocale;
}

function ModalEditProdotto(props: ModalEditProdottoProps) {
  const dispatch: AppDispatch = useDispatch();
  const listaTipi: GetTipoProdottoResponse[] | null = useSelector((state: RootState) => state.backoffice.listaTipi);
  const listaIngredienti: IngredientiProdottiLocale[] | null = useSelector(
    (state: RootState) => state.backoffice.listaIngredienti
  );
  const [ingredientiSelezionati, setIngredientiSelezionati] = useState<number[]>([]);
  const [imgProdotto, setImgProdotto] = useState<File | null>(null);

  console.log(props.prodotto);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProductDto>();

  async function onSubmit(data: EditProductDto) {
    const editProdottoDto: EditProductDto = {
      idProdottoRistorante: props.prodotto.idProdottoRistorante,
      idRistorante: props.idRistorante,
      nomeProdotto: data.nomeProdotto,
      prezzoProdotto: data.prezzoProdotto,
      isAttivo: true,
      idIngredienti: ingredientiSelezionati,
      descrizioneProdotto: data.descrizioneProdotto ? data.descrizioneProdotto : null,
      idTipiProdotto: data.idTipiProdotto != 0 ? data.idTipiProdotto : null,
    };

    console.log(editProdottoDto);

    // dispatch(newProdottoPost(newProdottoDto, imgProdotto));
    props.handleClose();
  }
  function handleIngredienti(checked: boolean, idIngrediente: number) {
    if (checked) {
      setIngredientiSelezionati([...ingredientiSelezionati, idIngrediente]);
    } else {
      setIngredientiSelezionati(ingredientiSelezionati.filter((ing) => ing !== idIngrediente));
    }
  }
  function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      /*   const formData = new FormData();
        formData.append("logo", e.target.files[0]); */
      setImgProdotto(e.target.files[0]);
    }
  }

  useEffect(() => {
    dispatch(GetIngredientiRistorante(props.idRistorante));
    dispatch(GetListaTipi());
  }, [props.prodotto]);

  useEffect(() => {
    if (props.prodotto) {
      setValue("nomeProdotto", props.prodotto.nomeProdotto);
      setValue("prezzoProdotto", props.prodotto.prezzoProdotto);
      setValue("descrizioneProdotto", props.prodotto.descrizioneProdotto);
      if (props.prodotto.categoriaProdotto && props.prodotto.categoriaProdotto.length > 0) {
        setValue("idTipiProdotto", props.prodotto.categoriaProdotto[0].idTipoProdotto);
      }
    }
  }, [listaTipi, listaIngredienti, props.prodotto]);

  return (
    <div>
      {" "}
      <Modal fullscreen show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prodotto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className="">
            <Row>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="ristorante" label="Nome Prodotto*" className="">
                  <Form.Control
                    {...register("nomeProdotto", { required: true })}
                    className="rounded-0 focus"
                    type="text"
                    placeholder=""
                  />
                  {errors.nomeProdotto && <p className="text-danger">Il Nome del prodotto è obbligatorio</p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6} className="form-floating mb-3 ">
                <FloatingLabel controlId="Tag" label="Prezzo Prodotto*">
                  <Form.Control
                    {...register("prezzoProdotto", {
                      required: true,
                    })}
                    className="rounded-0 focus"
                    type="number"
                    placeholder=""
                    min={0}
                  />
                  {errors.prezzoProdotto && <p className="text-danger"> Il prezzo dell'ingrediente è obbligatorio </p>}
                </FloatingLabel>
              </Col>
              <Col xs={12} className="form-floating mb-3 ">
                <FloatingLabel controlId="Tag" label="Descrizione Prodotto*">
                  <Form.Control
                    {...register("descrizioneProdotto", {
                      required: false,
                    })}
                    className="rounded-0 focus"
                    type="text"
                    as={"textarea"}
                    style={{ height: "100px" }}
                    placeholder=""
                  />
                  {errors.descrizioneProdotto && (
                    <p className="text-danger"> Il prezzo dell'ingrediente è obbligatorio </p>
                  )}
                </FloatingLabel>
              </Col>
              <Col xs={6} className="form-floating ">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Immagine Prodotto</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="rounded-0 focus"
                    placeholder=""
                    onChange={handleImg}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} className="">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Seleziona Categoria</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="rounded-0 focus"
                    {...register("idTipiProdotto", {
                      required: true,
                    })}
                    defaultValue={0}
                  >
                    <option value={0}>Scegli una categoria</option>
                    {listaTipi &&
                      listaTipi.map((tipo, index) => (
                        <option key={`tipo-${index}`} value={tipo.idTipoProdotto}>
                          {tipo.nomeTipoProdotto}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                {errors.idTipiProdotto && <p className="text-danger"> Il prezzo dell'ingrediente è obbligatorio </p>}
              </Col>
              <Col xs={12}>
                <p className="mb-1 mt-2"> Seleziona gli ingredienti</p>
                <Row>
                  {listaIngredienti &&
                    listaIngredienti.map((ing, index) => (
                      <Col xs={6} lg={4} xxl={3} className="mt-2" key={"ing-" + index}>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label={ing.nomeIngrediente}
                          value={ing.idIngrediente}
                          onChange={(e) => handleIngredienti(e.target.checked, ing.idIngrediente)}
                        />
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
            <Row className=" justify-content-between mt-5">
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

export default ModalEditProdotto;
