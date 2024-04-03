import { Col, Row } from "react-bootstrap";

function MainOrderHeader() {
  return (
    <Row>
      <Col className="col-xxl-10 col-12 pe-xxl-5 ps-xl-4 pe-xl-5 pe-md-4 px-3">
        <Row>
          <Col className="col-xxl-8 col-sm-7 col-12">
            <div className="d-flex align-items-center">
              <img
                src="https://cdn.take2me.it/img/restaurants/7/1/9/719c596f-9dad-4372-92ea-b663076f2495.png"
                className="fix-h-50 fix-w-50 border-lightw me-2 mb-2"
                alt="Maxi Pizza"
              />
              <h1 className="h2 font-breef mb-1">Maxi Pizza</h1>
            </div>
            <small className="text-uppercase border p-1 my-1 me-1 d-inline-block">Pizza</small>
            <small className="text-uppercase border p-1 my-1 me-1 d-inline-block">Panini</small>
          </Col>
          <Col className="col-xxl-4 col-sm-5 col-12 py-sm-0 py-1">
            <div className="text-sm-end text-start">
              <div className="restaurant-full-address">
                <i className="fas fa-map-marker-alt text-success"></i>&nbsp;Piazza dei Navigatori, 1/C, San Giovanni in
                Marignano (RN)
              </div>
              <div>P. IVA:IT03245090406</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 py-2">
            Pizzeria di antica tradizione napoletana. Nei nostri impasti non utilizziamo farine 0 o 00 ma solo farine
            biologiche macinate a pietra italiane. Puoi scegliere anche tra altri impasti come, farro, 10 cereali,
            canapa o integrale. Usiamo solo ingredienti di prima qualità con i quali farciamo i nostri panini fatti al
            momento.
          </Col>
        </Row>
      </Col>
      <Col className="col-xxl-2 col-12 px-xxl-2 ps-xl-4 pe-xl-5 pe-md-4 px-3">
        <Row>
          <Col className="col-xxl-12 col-md-7 col-sm-8 col-12 py-sm-2 py-1">
            <strong className="text-leaf-500">
              <i className="fa fa-info-circle"></i>
              Orari di apertura:{" "}
            </strong>
            17:30 - 22:05
            <span className="d-block pb-2"></span>
            <strong className="text-leaf-500">Pagamenti accettati: </strong>
            Carte di credito
          </Col>
          <Col className="col-xxl-12 col-md-5 col-sm-4 col-12 py-sm-2 py-1 text-xxl-start text-sm-end text-start"></Col>
        </Row>
      </Col>
    </Row>
  );
}

export default MainOrderHeader;
