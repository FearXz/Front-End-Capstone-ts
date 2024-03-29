import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-official.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/reducers/authReducer";

function MyNavbar() {
  const profile = useSelector((state) => state.auth.loggedProfile);
  const dispatch = useDispatch();

  return (
    <header className=" sticky-top z-3 bg-light section-nav">
      <Container fluid>
        <Row>
          <Col className="col-3 d-md-none d-flex align-items-center px-sm-3 px-0">
            <Link
              to={"/auth/login"}
              className="btn btn-link btn-lg rounded-0 border-end px-sm-3 px-2 my-1"
              rel="nofollow"
            >
              <i className="bi bi-person-circle  text-gray-800 fs-4"></i>
            </Link>
            <Link to={"/contatti"} className="btn btn-link rounded-0 btn-lg border-end px-sm-3 px-2 ">
              <i className="bi bi-chat-dots text-gray-800 fs-4"></i>
            </Link>
          </Col>
          <Col className="col-xxl-2 col-md-3 col-7 text-md-start text-center">
            <Link to={"/"} className="navbar-brand py-md-3 d-inline-block bg-lightw">
              <img src={logo} alt="Take2Me.it" className="img-fluid" width="195" />
            </Link>
          </Col>
          <Col className="col-xxl-10 col-md-9 col-2 d-flex justify-content-end align-items-center px-sm-3 px-0">
            <div className="d-md-flex d-none align-items-center border-start border-1 fix-h-50">
              {profile ? (
                <Link
                  to={"/"}
                  onClick={() => dispatch(setLogout())}
                  className="btn btn-link text-black text-decoration-none"
                  rel="nofollow"
                >
                  <i className="bi bi-person-circle text-leaf-500 fs-4"></i>&nbsp;&nbsp;
                  <span className=" text-uppercase text-leaf-500">{profile.utente.nome}</span>{" "}
                </Link>
              ) : (
                <Link to={"/auth/login"} className="btn btn-link text-black text-decoration-none" rel="nofollow">
                  <i className="bi bi-person-circle  text-gray-800 fs-4"></i>&nbsp;&nbsp;ACCEDI{" "}
                </Link>
              )}
            </div>
            <div className="d-md-flex d-none align-items-center border-start border-1 fix-h-50">
              <Link to={"/contatti"} className="btn btn-link text-black text-decoration-none">
                <i className="bi bi-chat-dots text-gray-800 fs-4"></i> CONTATTI{" "}
              </Link>
            </div>
            <div className="d-flex align-items-center border-start border-1 fix-h-50">
              <button className="btn btn-link  position-relative">
                <i className="bi bi-basket3-fill  text-green fs-3"></i>
                <span className="position-absolute translate-middle badge rounded-pill bg-success total-products-cart"></span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default MyNavbar;
