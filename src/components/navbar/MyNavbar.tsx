import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate, Location } from "react-router-dom";
import logo from "../../assets/images/logo-official.png";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, ListaRistorantiResponse, LoginAziendaResponse, LoginResponse } from "../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../redux/store/store";
import { setSelectedProfileSection } from "../../redux/reducers/persistedInfoReducer";
import { setLogout } from "../../redux/reducers/authReducer";
import { ORDINI, PROFILO } from "../../functions/config";

function MyNavbar() {
  const profile: LoginResponse | null = useSelector((state: RootState) => state.auth.loggedProfile);
  const azienda: LoginAziendaResponse | null = useSelector((state: RootState) => state.auth.loggedAzienda);
  const lastRestaurant: ListaRistorantiResponse | null = useSelector((state: RootState) => state.persist.restaurantId);
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);
  const navigate: Function = useNavigate();
  const location: Location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  return (
    <header className=" sticky-top z-3 bg-light section-nav">
      <Container fluid>
        <Row>
          <Col className="col-3 d-md-none d-flex align-items-center px-sm-3 px-0">
            {location.pathname == "/utente" || location.pathname == "/azienda" ? (
              <div className="d-flex d-sm-none align-items-center border-end border-1 fix-h-50  order-0">
                <Dropdown>
                  <Dropdown.Toggle className="btn btn-link bg-light custom-dropdown-toggle" id="dropdown-basic">
                    <i className="bi bi-list text-green fs-3"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className=" rounded-0">
                    <Dropdown.Item className="sideHover" onClick={() => dispatch(setSelectedProfileSection(PROFILO))}>
                      Profilo
                    </Dropdown.Item>
                    <Dropdown.Item className="sideHover" onClick={() => dispatch(setSelectedProfileSection(ORDINI))}>
                      Ordini
                    </Dropdown.Item>
                    <Dropdown.Item className="sideHover" onClick={() => dispatch(setLogout())}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : profile ? (
              <Link
                to={"/utente"}
                className="btn btn-link btn-lg rounded-0 border-end px-sm-3 px-2 my-1"
                rel="nofollow"
              >
                <i className="bi bi-person-circle  text-leaf-500 fs-4"></i>
              </Link>
            ) : azienda ? (
              <Link
                to={"/azienda"}
                className="btn btn-link btn-lg rounded-0 border-end px-sm-3 px-2 my-1"
                rel="nofollow"
              >
                <i className="bi bi-person-circle  text-leaf-500 fs-4"></i>
              </Link>
            ) : (
              <Link
                to={"/auth/login"}
                className="btn btn-link btn-lg rounded-0 border-end px-sm-3 px-2 my-1"
                rel="nofollow"
              >
                <i className="bi bi-person-circle  text-gray-800 fs-4"></i>
              </Link>
            )}

            {azienda ? (
              <Link to={"/backoffice"} className="btn btn-link text-black text-decoration-none">
                <i className="bi bi-person-workspace text-leaf-500 fs-4"></i>
                <span className="text-leaf-500"> </span>{" "}
              </Link>
            ) : (
              <Link to={"/contatti"} className="btn btn-link text-black text-decoration-none">
                <i className="bi bi-chat-dots text-gray-800 fs-4"></i>
              </Link>
            )}
          </Col>
          <Col className="col-xxl-2 col-md-3 col-7 text-md-start text-center">
            <Link to={"/"} className="navbar-brand py-md-3 d-inline-block bg-lightw">
              <img src={logo} alt="Take2Me.it" className="img-fluid" width="195" />
            </Link>
          </Col>
          <Col className="col-xxl-10 col-md-9 col-2 d-flex justify-content-end align-items-center px-sm-3 px-0">
            <div className="d-md-flex d-none align-items-center border-start border-1 fix-h-50">
              {profile ? (
                <Link to={"/utente"} className="btn btn-link text-black text-decoration-none" rel="nofollow">
                  <i className="bi bi-person-circle text-leaf-500 fs-4"></i>&nbsp;&nbsp;
                  <span className=" text-uppercase text-leaf-500">{profile.utente.nome}</span>{" "}
                </Link>
              ) : azienda ? (
                <Link
                  to={"/azienda"}
                  className="btn btn-link text-black text-decoration-none"
                  rel="nofollow"
                  // onClick={() => dispatch(setLogout())}
                >
                  <i className="bi bi-person-circle text-leaf-500 fs-4"></i>&nbsp;&nbsp;
                  <span className=" text-uppercase text-leaf-500">{azienda.azienda.nomeAzienda}</span>{" "}
                </Link>
              ) : (
                <Link to={"/auth/login"} className="btn btn-link text-black text-decoration-none" rel="nofollow">
                  <i className="bi bi-person-circle  text-gray-800 fs-4"></i>&nbsp;&nbsp;ACCEDI{" "}
                </Link>
              )}
            </div>

            <div className="d-md-flex d-none align-items-center border-start border-1 fix-h-50">
              {azienda ? (
                <Link to={"/backoffice"} className="btn btn-link text-black text-decoration-none">
                  <i className="bi bi-person-workspace text-leaf-500 fs-4"></i>
                  <span className="text-leaf-500"> BACKOFFICE</span>{" "}
                </Link>
              ) : (
                <Link to={"/contatti"} className="btn btn-link text-black text-decoration-none">
                  <i className="bi bi-chat-dots text-gray-800 fs-4"></i> CONTATTI{" "}
                </Link>
              )}
            </div>
            <div className="d-flex align-items-center border-start border-1 fix-h-50">
              <button
                className="btn btn-link  position-relative"
                onClick={() => (lastRestaurant?.idRistorante ? navigate("/local/" + lastRestaurant.idRistorante) : "")}
              >
                <i className="bi bi-basket3-fill  text-green fs-3"></i>
                {cart && cart.length > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill bg-leaf-500 total-products-cart">
                    {cart.reduce((acc, item) => acc + item.quantita, 0)}
                  </span>
                )}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default MyNavbar;
