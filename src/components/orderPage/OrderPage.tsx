import { Container, Row } from "react-bootstrap";
import MainOrder from "./inner/MainOrder";
import CartOrder from "./inner/CartOrder";
import MobileOrder from "./inner/MobileOrder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchLocaleId } from "../../redux/actions/orderPageAction";
import { useNavigate, useParams } from "react-router-dom";
import { CoordinateSearch } from "../../interfaces/interfaces";

function OrderPage() {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = params.id ? params.id : "";
  const indirizzoCercato: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const navigate: Function = useNavigate();

  useEffect(() => {
    if (!indirizzoCercato) {
      navigate("/");
    }
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
