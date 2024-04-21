import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { getListaRistorantiById } from "../../redux/actions/backofficeAction";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { GetRistorantiByIdAziendaResponse } from "../../interfaces/interfaces";

function BackOfficePage() {
  const dispatch: AppDispatch = useDispatch();
  const refresh: boolean = useSelector((state: RootState) => state.global.refresh);
  const listaRistoranti: GetRistorantiByIdAziendaResponse[] | null = useSelector(
    (state: RootState) => state.backoffice.localeById
  );
  const [search, setSearch] = useState<string>("");

  const filteredRistoranti = listaRistoranti?.filter((ristorante) =>
    ristorante.nomeRistorante.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(getListaRistorantiById());
  }, [refresh]);

  return (
    <main>
      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col xs={4}>
            <h1 className="text-center font-breef my-3">BackOffice</h1>
          </Col>
          <Col xs={4} className="d-flex justify-content-end  align-items-center">
            <Link to={"/backoffice/newlocal"} className="btn btn-leaf-500 rounded-0 button-border-success text-white">
              Crea Locale
            </Link>
          </Col>
          <Col xs={12}>
            <Form.Control
              className="rounded-0 fix-h-50  my-input focus"
              type="text"
              placeholder="Cerca il tuo locale"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>

        <TransitionGroup className="row">
          {filteredRistoranti?.map((ristorante: GetRistorantiByIdAziendaResponse, index: number) => (
            <CSSTransition key={`ristorante-${index}`} timeout={500} classNames="fade">
              <Col className="col-xxl-3 col-xl-4 col-sm-6 col-12 px-2">
                <div className="py-2 px-2 my-3 shadow ">
                  <Link
                    to={`/backoffice/local/${ristorante.idRistorante}`}
                    className="d-block restaurant-img fix-h-230  rounded-3 position-relative "
                    style={
                      ristorante?.isAttivo === false
                        ? { filter: "grayscale(100%)", opacity: "0.5" /* , pointerEvents: "none" */ }
                        : {}
                    }
                  >
                    <img
                      className="w-100 h-100 rounded-3 object-fit-cover"
                      src={
                        ristorante.imgCopertina
                          ? ristorante.imgCopertina
                          : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                      }
                      alt=""
                    />
                    <img
                      src={
                        ristorante.imgLogo
                          ? ristorante.imgLogo
                          : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                      }
                      className="img-logo border-light"
                      alt={ristorante.nomeRistorante}
                    />
                  </Link>
                  <div className="pt-5">
                    <Link
                      to={`/backoffice/local/${ristorante.idRistorante}`}
                      className="text-black text-decoration-none"
                    >
                      <h5 className="h5 mb-0 fw-bold ">{ristorante.nomeRistorante}</h5>
                      <Row className="justify-content-between">
                        <Col className="">{ristorante.tagRistorante}</Col>
                      </Row>
                    </Link>
                  </div>
                </div>
              </Col>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    </main>
  );
}

export default BackOfficePage;
