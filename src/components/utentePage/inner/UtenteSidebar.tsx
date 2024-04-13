import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { setLogout } from "../../../redux/reducers/authReducer";
import { setSelectedProfileSection } from "../../../redux/reducers/persistedInfoReducer";
import { ORDINI, PROFILO } from "../../../functions/config";

function UtenteSidebar() {
  const dispatch: AppDispatch = useDispatch();
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedOption);

  return (
    <div className=" sticky-top top-90">
      <div
        className={
          selectedOption == "profilo"
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedProfileSection(PROFILO))}
      >
        <i className="bi bi-person-circle"></i> <span>Profilo</span>
      </div>
      <div
        className={
          selectedOption == "ordini"
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedProfileSection(ORDINI))}
      >
        <i className="bi bi-bag-check-fill"></i> <span>Ordini</span>
      </div>
      <div className="fs-5 text-leaf-500 p-3 fw-light sideHover" onClick={() => dispatch(setLogout())}>
        <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
      </div>
    </div>
  );
}

export default UtenteSidebar;
