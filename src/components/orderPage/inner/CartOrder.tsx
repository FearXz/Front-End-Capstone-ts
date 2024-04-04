import { Col } from "react-bootstrap";
import CartList from "./cartOrder/CartList";
import CartHeader from "./cartOrder/CartHeader";
import CartSummary from "./cartOrder/CartSummary";

function CartOrder() {
  return (
    <Col id="cart-sction-order" className=" bg-gray-100 col-xxl-3 col-xl-4 col-5 px-0 shadow bg-100 d-lg-block d-none">
      <div className="sticky-top z-1 top-90">
        <CartHeader />
        <CartList />
        <CartSummary />
      </div>
      <div></div>
    </Col>
  );
}

export default CartOrder;
