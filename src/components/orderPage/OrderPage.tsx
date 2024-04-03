import { Container, Row } from "react-bootstrap";
import MainOrder from "./inner/MainOrder";
import CartOrder from "./inner/CartOrder";
import MobileOrder from "./inner/MobileOrder";

function OrderPage() {
  return (
    <main>
      <Container fluid>
        <Row>
          <MainOrder />
          <CartOrder />
        </Row>
        <MobileOrder />
      </Container>
    </main>
  );
}

export default OrderPage;
