import { useDispatch, useSelector } from "react-redux";
import { LocaleIdResponse } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { format, addMinutes, parse, isBefore, addDays, setSeconds, setMinutes, setHours } from "date-fns";
import { useEffect, useState } from "react";
import { toggleRefresh } from "../../../../redux/reducers/stateReducer";
import { setSelectedHour } from "../../../../redux/reducers/persistedInfoReducer";
import { toast } from "react-toastify";

function MultiSelectOrderHour() {
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const refresh: boolean = useSelector((state: RootState) => state.global.refresh);
  const selectedHour: string | null = useSelector((state: RootState) => state.persist.selectedHour);
  const now: Date = new Date();
  const openingTime: Date = locale ? parse(locale.orarioApertura, "HH:mm:ss", new Date()) : new Date();
  const closingTime: Date = locale ? parse(locale.orarioChiusura, "HH:mm:ss", new Date()) : new Date();
  const dispatch: AppDispatch = useDispatch();
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  let currentTime: Date = openingTime;
  let fixedClosingTime: Date = closingTime;

  let midnight = setSeconds(setMinutes(setHours(now, 0), 0), 0);
  midnight = addDays(midnight, 1);

  function checkSelectedHour(selectedHour: string | null): boolean {
    if (timeOptions.length === 0) {
      dispatch(setSelectedHour(null));
      return false;
    }

    if (!selectedHour) {
      dispatch(setSelectedHour(timeOptions[0]));
      return false;
    }
    if (selectedHour && new Date(selectedHour).getTime() < now.getTime()) {
      dispatch(setSelectedHour(timeOptions[0]));
      toast.error("L'orario selezionato non è più disponibile. Selezionato il primo orario disponibile.");
      return false;
    }
    return true;
  }

  useEffect(() => {
    checkSelectedHour(selectedHour);
    const intervalId = setInterval(() => {
      if (now.getTime() >= currentTime.getTime() && now.getTime() <= fixedClosingTime.getTime()) {
        // Trigger a re-render by updating the state
        dispatch(toggleRefresh());
      }
    }, 30000); // Check every minute
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeOptions]);

  useEffect(() => {
    let newTimeOptions: string[] = [];

    if (currentTime.getTime() >= fixedClosingTime.getTime()) {
      fixedClosingTime = addDays(fixedClosingTime, 1);
    }

    if (fixedClosingTime.getTime() >= midnight.getTime()) {
      fixedClosingTime = addDays(fixedClosingTime, -1);
      currentTime = addDays(currentTime, -1);
    }
    if (fixedClosingTime.getTime() <= now.getTime()) {
      currentTime = addDays(currentTime, 1);
      fixedClosingTime = addDays(fixedClosingTime, 1);
    }

    // Ensure that the current time is not before the opening time
    if (currentTime.getTime() <= now.getTime()) {
      currentTime = addMinutes(currentTime, 10);
    }

    while (currentTime.getTime() <= fixedClosingTime.getTime()) {
      if (currentTime.getTime() >= now.getTime()) {
        newTimeOptions.push(format(currentTime, "HH:mm"));
      }
      currentTime = addMinutes(currentTime, 10);
    }
    setTimeOptions(newTimeOptions);
  }, [locale, refresh, selectedHour]);

  return (
    <div className="cart-requested-for p-3">
      <div className="form-floating">
        <select
          className="form-select rounded-0 focus"
          id="floatingSelect"
          aria-label="Scegli l'orario"
          name="selectHour"
          onChange={(e) => dispatch(setSelectedHour(e.currentTarget.value))}
        >
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <label typeof="floatingSelect">Scegli l'orario</label>
      </div>
    </div>
  );
}

export default MultiSelectOrderHour;
