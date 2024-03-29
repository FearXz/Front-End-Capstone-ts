import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchLocaliAtCoordinate } from "../../redux/actions/homeSearchAction";
import { useQuery } from "../../functions/functions";
import { Col, Container, Row } from "react-bootstrap";
import SearchSideBar from "./SideBar/SearchSideBar";
import SearchLocalList from "./Mainlist/SearchLocalList";

function SearchPage() {
  const params = useQuery();
  const dispatch: any = useDispatch();
  // ho lat e lon come parametri
  console.log(params);
  const lat: string | null = params.get("lat");
  const lon: string | null = params.get("lon");

  useEffect(() => {
    // Qui puoi fare il fetch per i ristoranti vicini
    dispatch(searchLocaliAtCoordinate(lat || "", lon || ""));
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
