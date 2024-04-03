import { Col } from "react-bootstrap";
import MainOrderHeader from "./mainOrder/MainOrderHeader";
import MainOrderProductSection from "./mainOrder/MainOrderProductSection";

function MainOrder() {
  return (
    <Col id="main-section-order" className="col-xxl-9 col-xl-8 col-lg-7 col-12 mt-2">
      <MainOrderHeader />
      <MainOrderProductSection />
    </Col>
  );
}

export default MainOrder;
