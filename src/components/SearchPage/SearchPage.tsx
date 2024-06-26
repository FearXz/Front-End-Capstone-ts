import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import SearchSideBar from "./SideBar/SearchSideBar";
import SearchLocalList from "./Mainlist/SearchLocalList";
import { useNavigate, useParams } from "react-router-dom";
import { searchHomeAddress } from "../../redux/actions/LocalPageAction";
import { AppDispatch } from "../../redux/store/store";

function SearchPage() {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  console.log(params.address);

  const address: string = params.address ? params.address : "";

  useEffect(() => {
    dispatch(searchHomeAddress(address, navigate));
  }, []);

  return (
    <main>
      <Container fluid className="mt-2">
        <Row className="pb-xl-5 pb-lg-4 pb-3 pt-md-0 pt-5 mt-sm-0 mt-3">
          <Col className="col-xxl-2 col-xl-3 col-lg-4 col-12 pt-4 bg-white px-0 d-lg-block d-none">
            <SearchSideBar />
            <div>&nbsp; </div>
          </Col>
          <Col className="col-xxl-10 col-xl-9 col-lg-8 col-12 restaurants">
            <SearchLocalList />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SearchPage;
