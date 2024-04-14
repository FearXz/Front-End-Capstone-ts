import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { setLogout } from "../../../redux/reducers/authReducer";
import { setSelectedAziendaSection } from "../../../redux/reducers/persistedInfoReducer";
import { DASHBOARD, PROFILO } from "../../../functions/config";

function AziendaSidebar() {
  const dispatch: AppDispatch = useDispatch();
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedAziendaOption);

  return (
    <div className=" sticky-top top-90">
      <div
        className={
          selectedOption == PROFILO
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedAziendaSection(PROFILO))}
      >
        <i className="bi bi-person-circle"></i> <span>Profilo</span>
      </div>
      <div
        className={
          selectedOption == DASHBOARD
            ? "fs-5 text-leaf-500 p-3 fw-light selectedSide"
            : "fs-5 text-leaf-500 p-3 fw-light sideHover"
        }
        onClick={() => dispatch(setSelectedAziendaSection(DASHBOARD))}
      >
        <i className="bi bi-speedometer"></i> <span>Dashboard</span>
      </div>
      <div className="fs-5 text-leaf-500 p-3 fw-light sideHover" onClick={() => dispatch(setLogout())}>
        <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
      </div>
    </div>
  );
}

export default AziendaSidebar;
