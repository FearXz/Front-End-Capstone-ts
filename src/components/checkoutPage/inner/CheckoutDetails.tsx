import { Container, Row } from "react-bootstrap";
import CheckoutProductList from "./checkoutDetails/CheckoutProductList";
import CheckoutOrderInfo from "./checkoutDetails/CheckoutOrderInfo";

function CheckoutDetails() {
  return (
    <section>
      <Container className="pb-xl-5 pb-md-3 pb-2">
        <Row>
          <CheckoutProductList />
          <CheckoutOrderInfo />
        </Row>
      </Container>
    </section>
  );
}

export default CheckoutDetails;
