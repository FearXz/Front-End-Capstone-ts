import { Modal } from "react-bootstrap";
import CartHeader from "../cartOrder/CartHeader";
import CartList from "../cartOrder/CartList";
import CartSummary from "../cartOrder/CartSummary";

interface ProductFilterModalProps {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
}

function MobileOrderModal(p: ProductFilterModalProps) {
  return (
    <div>
      <Modal dialogClassName="rounded-0" show={p.show} onHide={p.handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className=" font-breef">FDFGDGDFDFGDFGDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartHeader />
          <div className=" max-h-300 overflow-auto">
            <CartList />
          </div>
          <CartSummary />
        </Modal.Body>
        <Modal.Footer className=" justify-content-between"></Modal.Footer>
      </Modal>
    </div>
  );
}

export default MobileOrderModal;
