import { useDispatch, useSelector } from "react-redux";
import { GetBoLocaleIdResponse, TagCategorieDto, categorieRistorante } from "../../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../../redux/store/store";
import { Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTagCategories, putTagCategories } from "../../../../../redux/actions/backofficeAction";

interface LocalTagCategoriesModalProps {
  show: boolean;
  handleClose: () => void;
}

function LocalTagCategoriesModal(props: LocalTagCategoriesModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const listaTagCategorie: categorieRistorante[] = useSelector(
    (state: RootState) => state.backoffice.listaTagCategories
  );

  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const categorieLocale: categorieRistorante[] = locale?.categorieRistorante ? locale.categorieRistorante : [];

  const [newCategorie, setNewCategorie] = useState<categorieRistorante[]>(categorieLocale ? categorieLocale : []);

  console.log(newCategorie);

  const handleToggle = (categoria: categorieRistorante) => {
    setNewCategorie((prevCategories) => {
      const isCategories = prevCategories.some((cat) => cat.idCategorie === categoria.idCategorie);

      if (isCategories) {
        return prevCategories.filter((cat) => cat.idCategorie !== categoria.idCategorie);
      } else {
        return [...prevCategories, categoria];
      }
    });
  };

  function handleCategieSubmit() {
    const tagCategorieDto: TagCategorieDto = {
      idRistorante: locale?.idRistorante ? locale.idRistorante : 0,
      IdTagCategoria: newCategorie.map((tag) => tag?.idCategorie || 0),
    };
    console.log(tagCategorieDto);
    dispatch(putTagCategories(tagCategorieDto));
    props.handleClose();
  }

  useEffect(() => {
    dispatch(getTagCategories());
  }, [locale]);

  return (
    <div>
      {" "}
      <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tag Categorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {listaTagCategorie?.map((categoria, index) => (
            <div key={"dayoption-" + index}>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label={categoria.nomeCategoria}
                checked={newCategorie.some((tag) => tag.idCategorie === categoria.idCategorie)}
                onChange={() => handleToggle(categoria)}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className=" justify-content-between">
          <Col>
            <div className="rounded-0 text-white btn btn-gray-500 button-border-gray" onClick={props.handleClose}>
              CHIUDI
            </div>
          </Col>
          <Col className="text-end">
            <button
              className="rounded-0 text-white btn btn-leaf-500 button-border-success"
              onClick={handleCategieSubmit}
            >
              MODIFICA
            </button>
          </Col>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LocalTagCategoriesModal;
