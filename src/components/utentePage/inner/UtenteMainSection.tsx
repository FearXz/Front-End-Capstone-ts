import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import UtenteProfilo from "./UtenteMainSection/UtenteProfilo";
import UtenteOrdini from "./UtenteMainSection/UtenteOrdini";
import { ORDINI, PROFILO } from "../../../functions/config";

function UtenteMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedOption);

  if (selectedOption === PROFILO) {
    return <UtenteProfilo />;
  }
  if (selectedOption === ORDINI) {
    return <UtenteOrdini />;
  }
  return <div></div>;
}

export default UtenteMainSection;
