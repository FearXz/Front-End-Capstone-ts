import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchFormLocal from "../../SideBar/inner/SearchFormLocal";
import CategoryFilter from "../../SideBar/inner/CategoryFilter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import {
  setFiltroCheckBox,
  setFiltroRange,
  setFiltroSearchBar,
} from "../../../../redux/reducers/searchRistoranteReducer";

interface MobileModalProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function MobileModal(props: MobileModalProps) {
  const dispatch: AppDispatch = useDispatch();

  function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(setFiltroRange(10));
    dispatch(setFiltroSearchBar(""));
    dispatch(setFiltroCheckBox([]));

    props.handleClose();
  }

  return (
    <div>
      <Modal
        dialogClassName="rounded-0"
        fullscreen={true}
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className=" font-breef">Filtri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchFormLocal />
          <CategoryFilter />
        </Modal.Body>
        <Modal.Footer className=" justify-content-between">
          <Button className="btn btn-gray-500 rounded-0 button-border-gray text-white" onClick={handleReset}>
            RESETTA
          </Button>
          <Button className="btn btn-leaf-500 rounded-0 button-border-success text-white" onClick={props.handleClose}>
            CERCA
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MobileModal;
