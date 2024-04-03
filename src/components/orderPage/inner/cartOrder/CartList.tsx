import { Col, Row } from "react-bootstrap";

function CartList() {
  return (
    <div className="text-center py-4 text-center py-4 border-top border-leaf-500 border-bottom">
      <h3 className="h3 mb-0 font-breef">Il tuo carrello</h3>
      <div className=" pt-4 px-xxl-5 px-3" id="products-cart-container" style={{ overflow: "auto", height: "auto" }}>
        {/* MAP ELEMENTI CARRELLO */}
        <Row className="py-2">
          <Col className="col-sm-7 col-6 d-flex justify-content-between">
            <div className="product-cart-name text-start">
              <strong className="text-grey-black">Fornarina</strong>&nbsp;
              <button className="btn btn-transparent btn-action btn-modify-product p-0" type="button">
                <i className="bi bi-pencil-fill text-leaf-500"></i>
              </button>
            </div>
          </Col>
          <Col className=" col-sm-5 col-6 d-flex justify-content-end px-xl-3 px-2 flex-sm-nowrap flex-wrap">
            <div className="d-flex align-items-start px-xl-2 px-sm-1">
              <button className="btn btn-link btn-action  py-0 px-1" type="button">
                <i className="bi bi-plus-circle text-black"></i>
              </button>
              <span className=" px-1">1</span>
              <button className="btn btn-link btn-action  py-0 px-1" type="button">
                <i className="bi bi-dash-circle text-black"></i>
              </button>
            </div>
            <div className=" text-right px-1">
              <strong className="text-grey-black nowrap">€ 7,50</strong>
            </div>
          </Col>
          <Col className="col-12 text-start mt-1">
            <strong className="text-leaf-500">con</strong> acciughe
            <strong className="text-leaf-500">
              {" "}
              <br />
              con
            </strong>{" "}
            aglio
            <strong className="text-danger">
              <br />
              senza
            </strong>{" "}
            olio <br />
          </Col>
        </Row>
        {/* FINE MAP */}
      </div>
    </div>
  );
}

export default CartList;
