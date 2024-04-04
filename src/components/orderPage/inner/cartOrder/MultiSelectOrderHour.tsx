import { useDispatch, useSelector } from "react-redux";
import { LocaleIdResponse } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { format, addMinutes, isAfter, parse, isBefore, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { toggleRefresh } from "../../../../redux/reducers/stateReducer";

function MultiSelectOrderHour() {
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const refresh: boolean = useSelector((state: RootState) => state.global.refresh);
  const now: Date = new Date();
  const openingTime: Date = locale ? parse(locale.orarioApertura, "HH:mm:ss", new Date()) : new Date();
  const closingTime: Date = locale ? parse(locale.orarioChiusura, "HH:mm:ss", new Date()) : new Date();
  const dispatch: AppDispatch = useDispatch();
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  let currentTime: Date = openingTime;
  let fixedClosingTime: Date = closingTime;

  useEffect(() => {
    let newTimeOptions: string[] = [];

    if (isBefore(closingTime, openingTime)) {
      fixedClosingTime = addDays(closingTime, 1);
    } else {
      fixedClosingTime = closingTime;
    }

    // Ensure that the current time is not before the opening time
    if (isBefore(currentTime, now)) {
      currentTime = addMinutes(currentTime, 10);
    }

    while (isAfter(fixedClosingTime, currentTime)) {
      if (isAfter(currentTime, now)) {
        newTimeOptions.push(format(currentTime, "HH:mm"));
      }
      currentTime = addMinutes(currentTime, 10);
    }
    setTimeOptions(newTimeOptions);
  }, [locale, refresh]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (isAfter(now, currentTime)) {
        // Trigger a re-render by updating the state
        dispatch(toggleRefresh());
      }
    }, 30000); // Check every minute

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="cart-requested-for p-3">
      <div className="form-floating">
        <select
          className="form-select rounded-0 focus"
          id="floatingSelect"
          aria-label="Scegli l'orario"
          name="selectHour"
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
