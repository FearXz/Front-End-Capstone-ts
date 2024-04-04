import { Container, Row } from "react-bootstrap";
import MainOrder from "./inner/MainOrder";
import CartOrder from "./inner/CartOrder";
import MobileOrder from "./inner/MobileOrder";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { fetchLocaleId } from "../../redux/actions/orderPageAction";
import { useParams } from "react-router-dom";

function OrderPage() {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = params.id ? params.id : "";

  useEffect(() => {
    dispatch(fetchLocaleId(id));
  }, []);

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
