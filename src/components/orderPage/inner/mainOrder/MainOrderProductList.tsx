import { Col, Row } from "react-bootstrap";

function MainOrderProductList() {
  return (
    <Col className="col-xxl-10 col-xl-9 col-sm-8 col-12 ps-xxl-3 px-3">
      {/* MAP TIPIPRODOTTI */}
      <div id="tipo-prodotto">
        <div className="pt-md-4 pt-2 border-bottom border-leaf-500 d-flex justify-content-between align-items-end">
          <h3 className="h4 text-leaf-500 fw-bold text-uppercase mb-0">Pizze classiche</h3>
        </div>
        <Row>
          {/* MAP CARD */}
          <Col className="col-xxl-6 col-12 py-md-3 py-2 ">
            <div className="shadow h-100 p-md-3 p-2 cursor-pointer ">
              <Row>
                <Col className="col-sm-4 col-12 ">
                  <div className="" style={{ position: "relative", width: "100%", paddingBottom: "100%" }}>
                    <img
                      src="https://cdn.take2me.it/img/products/3/7/0/3701812e-ce1c-422c-bece-38ecc2827027.jpg"
                      alt="Fornarina | Maxi Pizza"
                      className=" w-100 h-100 rounded-3 object-fit-cover position-absolute"
                    />
                  </div>
                </Col>
                <Col className=" col-sm-8 col-12 mt-sm-0 mt-3 ">
                  <Row className=" product-info-container">
                    <Col className="col-8 d-flex flex-sm-nowrap flex-wrap">
                      <h4 className="h5 mb-0 fw-semibold">Fornarina</h4>
                    </Col>
                    <Col className="col-4 text-end ">
                      <strong className="fw-semibold h5">€&nbsp;4,50</strong>
                    </Col>
                  </Row>
                  <div className="row">
                    <div className="col-12">
                      <em className="">olio, sale, rosmarino, impasto con farine bio</em>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          {/* FINE MAP CARD */}
        </Row>
      </div>
      {/* FINE MAP TIPIPRODOTTI*/}
    </Col>
  );
}

export default MainOrderProductList;
