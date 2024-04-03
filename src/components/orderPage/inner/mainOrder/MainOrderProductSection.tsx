import { Row } from "react-bootstrap";
import MainOrderSideBar from "./MainOrderSideBar";
import MainOrderProductList from "./MainOrderProductList";

function MainOrderProductSection() {
  return (
    <div className=" position-relative">
      <Row>
        <MainOrderSideBar />
        <MainOrderProductList />
      </Row>
    </div>
  );
}

export default MainOrderProductSection;
