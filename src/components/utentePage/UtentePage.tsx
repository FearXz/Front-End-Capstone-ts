import { Col, Container, Row } from "react-bootstrap";
import UtenteSidebar from "./inner/UtenteSidebar";
import UtenteMainSection from "./inner/UtenteMainSection";
import { useEffect } from "react";
import { AppDispatch } from "../../redux/store/store";
import { useDispatch } from "react-redux";
import { getUtente } from "../../redux/actions/utenteAction";

function UtentePage() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUtente());
  }, []);

  return (
    <main>
      <Container fluid className="">
        <Row className="vh-615">
          <Col className="col-3 col-xxl-2  bg-gray p-0 d-none d-sm-block ">
            <UtenteSidebar />
          </Col>
          <Col className="col-12 col-sm-9 col-xxl-10 pb-20">
            <UtenteMainSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default UtentePage;
