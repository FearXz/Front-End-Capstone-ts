import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { getRistorantiById } from "../../redux/actions/backofficeAction";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import BackofficeSideBar from "./backOfficeLocale/BackofficeSideBar";
import BackOfficeMainSection from "./backOfficeLocale/BackOfficeMainSection";

function BackOfficeLocale() {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const refresh: boolean = useSelector((state: RootState) => state.global.refresh);
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ? params.id : "0");

  useEffect(() => {
    dispatch(getRistorantiById(id, navigate));
  }, [refresh]);

  return (
    <main>
      <Container fluid className="">
        <Row className="vh-615">
          <Col className="col-3 col-xxl-2  bg-gray p-0 d-none d-md-block ">
            <BackofficeSideBar />
          </Col>
          <Col className="col-12 col-md-9 col-xxl-10 pb-2">
            {" "}
            <BackOfficeMainSection />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default BackOfficeLocale;
