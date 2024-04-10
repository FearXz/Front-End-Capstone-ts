import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import UtenteProfilo from "./UtenteMainSection/UtenteProfilo";
import UtenteOrdini from "./UtenteMainSection/UtenteOrdini";

function UtenteMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.utente.selectedOption);

  if (selectedOption === "profilo") {
    return <UtenteProfilo />;
  }
  if (selectedOption === "ordini") {
    return <UtenteOrdini />;
  }
  return <div></div>;
}

export default UtenteMainSection;
