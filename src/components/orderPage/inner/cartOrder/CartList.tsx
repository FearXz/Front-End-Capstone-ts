import { Col, Row } from "react-bootstrap";
import { CartProduct } from "../../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

function CartList() {
  const cart: CartProduct[] = useSelector((state: RootState) => state.persist.cart);

  return (
    <div className="text-center py-4 text-center py-4 border-top border-leaf-500 border-bottom">
      <h3 className="h3 mb-0 font-breef">Il tuo carrello</h3>
      <div className=" pt-4 px-xxl-5 px-3" style={{ overflow: "auto", height: "auto" }}>
        {/* MAP ELEMENTI CARRELLO */}
        {cart &&
          cart?.map((product: CartProduct, index: number) => (
            <Row key={`product-${index}`} className="py-2">
              <Col className="col-sm-7 col-6 d-flex justify-content-between">
                <div className="text-start">
                  <strong className="">{product.nomeProdotto}</strong>&nbsp;
                  <button className="btn btn-transparent p-0">
                    <i className="bi bi-pencil-fill text-leaf-500"></i>
                  </button>
                </div>
              </Col>
              <Col className=" col-sm-5 col-6 d-flex justify-content-end px-xl-3 px-2 flex-sm-nowrap flex-wrap">
                <div className="d-flex align-items-start px-xl-2 px-sm-1">
                  <button className="btn btn-link py-0 px-1">
                    <i className="bi bi-plus-circle text-black"></i>
                  </button>
                  <span className=" px-1">{product.quantita}</span>
                  <button className="btn btn-link py-0 px-1">
                    <i className="bi bi-dash-circle text-black"></i>
                  </button>
                </div>
                <div className=" text-right px-1 min-w-80">
                  <strong className="">€ {product.totale ? (product.totale * product.quantita).toFixed(2) : ""}</strong>
                </div>
              </Col>
              <Col className="col-12 text-start mt-1">
                {product.ingredienti
                  .filter((ing) => ing.isExtra)
                  .map((ing, index) => (
                    <p key={"con-" + index} className="m-0">
                      <strong className="text-leaf-500">extra</strong> {ing.nomeIngrediente + " x" + ing.quantita}{" "}
                    </p>
                  ))}
                {product.ingredienti
                  .filter((ing) => ing.isExtra == false && ing.quantita == 0)
                  .map((ing, index) => (
                    <p key={"con-" + index} className="m-0">
                      <strong className="text-danger">senza</strong> {ing.nomeIngrediente}{" "}
                    </p>
                  ))}
              </Col>
            </Row>
          ))}

        {/* FINE MAP */}
      </div>
    </div>
  );
}

export default CartList;
