import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchSideBar from "../../SideBar/SearchSideBar";

interface MobileModalProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function MobileModal(props: MobileModalProps) {
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
          <SearchSideBar />
        </Modal.Body>
        <Modal.Footer className=" justify-content-between">
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MobileModal;
