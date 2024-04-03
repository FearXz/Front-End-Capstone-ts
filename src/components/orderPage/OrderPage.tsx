import { Container, Row } from "react-bootstrap";
import MainOrder from "./inner/MainOrder";
import CartOrder from "./inner/CartOrder";
import MobileOrder from "./inner/MobileOrder";

function OrderPage() {
  return (
    <Container fluid>
      <Row>
        <MainOrder />
        <CartOrder />
      </Row>
      <MobileOrder />
    </Container>
  );
}

export default OrderPage;
