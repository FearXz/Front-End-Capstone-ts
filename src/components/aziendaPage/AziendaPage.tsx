import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import AziendaSidebar from "./inner/AziendaSidebar";
import AziendaMainSection from "./inner/AziendaMainSection";
import { getAzienda } from "../../redux/actions/aziendaAction";

function AziendaPage() {
  const dispatch: AppDispatch = useDispatch();
  const refresh: boolean = useSelector((state: RootState) => state.global.refresh);

  useEffect(() => {
    dispatch(getAzienda());
  }, [refresh]);

  return (
    <main>
      <Container fluid className="">
        <Row className="vh-615">
          <Col className="col-3 col-xxl-2  bg-gray p-0 d-none d-sm-block ">
            <AziendaSidebar />
          </Col>
          <Col className="col-12 col-sm-9 col-xxl-10 pb-20">
            <AziendaMainSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default AziendaPage;
