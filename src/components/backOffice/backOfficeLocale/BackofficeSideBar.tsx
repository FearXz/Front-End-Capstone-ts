import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { setSelectedBoPage } from "../../../redux/reducers/persistedInfoReducer";
import { INGREDIENTI, LOCALE, ORDINI, PRODOTTI } from "../../../functions/config";

function BackofficeSideBar() {
  const dispatch: AppDispatch = useDispatch();
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedBoPage);

  return (
    <div className=" sticky-top top-90">
      <div
        className={
          selectedOption == LOCALE
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedBoPage(LOCALE))}
      >
        <i className="bi bi-person-circle"></i> <span>Locale</span>
      </div>
      <div
        className={
          selectedOption == ORDINI
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedBoPage(ORDINI))}
      >
        <i className="bi bi-bag-check-fill"></i> <span>Ordini</span>
      </div>
      <div
        className={
          selectedOption == INGREDIENTI
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedBoPage(INGREDIENTI))}
      >
        <i className="bi bi-egg-fried"></i> <span>Ingredienti</span>
      </div>
      <div
        className={
          selectedOption == PRODOTTI
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedBoPage(PRODOTTI))}
      >
        <i className="bi bi-archive-fill"></i> <span>Prodotti</span>
      </div>
    </div>
  );
}

export default BackofficeSideBar;
