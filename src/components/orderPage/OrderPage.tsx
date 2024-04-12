import { Container, Row } from "react-bootstrap";
import MainOrder from "./inner/MainOrder";
import CartOrder from "./inner/CartOrder";
import MobileOrder from "./inner/MobileOrder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchLocaleId } from "../../redux/actions/orderPageAction";
import { useNavigate, useParams } from "react-router-dom";
import { CoordinateSearch, GiorniDiChiusura, ListaRistorantiResponse } from "../../interfaces/interfaces";
import { clearCart } from "../../redux/reducers/persistedInfoReducer";
import { setIsChiuso } from "../../redux/reducers/orderReducer";
import { isChiuso } from "../../functions/functions";

function OrderPage() {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const id = params.id ? params.id : "";
  const indirizzoCercato: CoordinateSearch | null = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const lastLocale: ListaRistorantiResponse | null = useSelector((state: RootState) => state.persist.restaurantId);
  const navigate: Function = useNavigate();
  const giornoChiusura: GiorniDiChiusura[] = lastLocale?.giorniDiChiusura || [];
  const now = new Date();

  useEffect(() => {
    if (!indirizzoCercato) {
      navigate("/");
    }
    if (lastLocale?.idRistorante !== parseInt(id)) {
      dispatch(clearCart());
      navigate("/");
    }
    if (
      isChiuso(lastLocale?.orarioApertura || "", lastLocale?.orarioChiusura || "") ||
      giornoChiusura.some((giorno) => giorno.numeroGiorno === now.getDay())
    ) {
      dispatch(setIsChiuso(true));
    } else {
      dispatch(setIsChiuso(false));
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
