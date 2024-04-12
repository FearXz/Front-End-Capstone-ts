import { Col, Row } from "react-bootstrap";
import { LocaleIdResponse, ProdottiLocale } from "../../../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { groupProductsByType } from "../../../../functions/functions";
import { useState } from "react";
import ProductFilterModal from "./ProductFilterModal";
import { setNewProduct } from "../../../../redux/reducers/orderReducer";

function MainOrderProductList() {
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const isChiuso: boolean = useSelector((state: RootState) => state.order.isChiuso);
  const productsByType = groupProductsByType(locale);

  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    dispatch(setNewProduct(null));
  };

  function handleProductModal(prodotto: ProdottiLocale) {
    dispatch(setNewProduct(prodotto));
    handleShow();
  }

  return (
    <Col className="col-xxl-10 col-xl-9 col-sm-8 col-12 ps-xxl-3 px-3">
      <ProductFilterModal show={show} handleClose={handleClose} handleShow={handleShow} />
      {/* MAP TIPIPRODOTTI */}
      {productsByType &&
        Object.entries(productsByType).map(([tipo, prodotti], index: number) => (
          <div id={tipo} key={`tipo-${index}`}>
            <div className="pt-md-4 pt-2 border-bottom border-leaf-500 d-flex justify-content-between align-items-end">
              <h3 className="h4 text-leaf-500 fw-bold text-uppercase mb-0">{tipo}</h3>
            </div>
            <Row>
              {/* MAP PRODOTTO */}
              {prodotti.map((prodotto: ProdottiLocale, index: number) => (
                <Col
                  key={`prodotto-${index}`}
                  className="col-xxl-6 col-12 py-md-3 py-2 "
                  style={
                    isChiuso || locale?.giorniDiChiusura.some((giorno) => giorno.numeroGiorno === new Date().getDay())
                      ? { filter: "grayscale(100%)", opacity: "0.5", pointerEvents: "none" }
                      : {}
                  }
                >
                  <div className="shadow h-100 p-md-3 p-2 cursor-pointer" onClick={() => handleProductModal(prodotto)}>
                    <Row>
                      <Col className={prodotto.imgProdotto ? "col-sm-4 col-12 d-flex align-item-center" : "d-none"}>
                        <div className="" style={{ position: "relative", width: "100%", paddingBottom: "50%" }}>
                          <img
                            src={
                              prodotto.imgProdotto
                                ? prodotto.imgProdotto
                                : "https://ralfvanveen.com/wp-content/uploads//2021/06/Placeholder-_-Begrippenlijst.svg"
                            }
                            alt={prodotto.nomeProdotto}
                            className=" w-100 h-100 rounded-3 object-fit-cover position-absolute"
                          />
                        </div>
                      </Col>
                      <Col className={prodotto.imgProdotto ? "col-sm-8 col-12 mt-sm-0 mt-3" : "col-12 mt-sm-0 mt-3"}>
                        <Row className=" product-info-container">
                          <Col className="col-8 d-flex flex-sm-nowrap flex-wrap">
                            <h4 className="h5 mb-0 fw-semibold">{prodotto.nomeProdotto}</h4>
                          </Col>
                          <Col className="col-4 text-end ">
                            <strong className="fw-semibold h5">€&nbsp;{prodotto.prezzoProdotto}</strong>
                          </Col>
                        </Row>
                        <div className="row">
                          <div className="col-12">
                            <em className="">
                              {prodotto.ingredienti.map(
                                (ingrediente, index) =>
                                  `${ingrediente.nomeIngrediente}${
                                    index < prodotto.ingredienti.length - 1 ? "," : "."
                                  } `
                              )}
                            </em>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}

              {/* FINE MAP PRODOTTO */}
            </Row>
          </div>
        ))}

      {/* FINE MAP TIPIPRODOTTI*/}
    </Col>
  );
}

export default MainOrderProductList;
