import loadingImg from "../../assets/images/logo_preload.png";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Loader() {
  const isLoading = useSelector((state) => state.global.isLoading);
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="loader ">
        <Container className="">
          <Row className=" align-items-center vh-100">
            <Col className="offset-2 col-8 text-center">
              <img src={loadingImg} alt="Loader Take2Me" className="img-fluid" />
              <div className="h3 fw-blod text-white">Caricamento in Corso ...</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return <div></div>;
}

export default Loader;
