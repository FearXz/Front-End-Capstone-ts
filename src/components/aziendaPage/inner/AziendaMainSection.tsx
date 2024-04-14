import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { DASHBOARD, PROFILO } from "../../../functions/config";

import AziendaProfilo from "./AziendaMainSection/AziendaProfilo";
import AziendaDashboard from "./AziendaMainSection/AziendaDashboard";

function AziendaMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedAziendaOption);

  if (selectedOption === PROFILO) {
    return <AziendaProfilo />;
  }
  if (selectedOption === DASHBOARD) {
    return <AziendaDashboard />;
  }
  return <div></div>;
}

export default AziendaMainSection;
