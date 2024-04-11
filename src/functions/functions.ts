import { useLocation } from "react-router-dom";
import { CartProduct, LocaleIdResponse } from "../interfaces/interfaces";
import { setHours, setMinutes, setSeconds, addDays, isAfter, isBefore } from "date-fns";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  function toRad(x: number): number {
    return (x * Math.PI) / 180;
  }

  var R = 6371; // km
  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;

  return distance;
}
export function groupProductsByType(locale: LocaleIdResponse | null): object {
  const groupedProducts: any = {};

  locale?.prodotti.forEach((prodotto) => {
    prodotto.tipiProdotto.forEach((tipo) => {
      if (!groupedProducts[tipo.nomeTipoProdotto]) {
        groupedProducts[tipo.nomeTipoProdotto] = [];
      }

      groupedProducts[tipo.nomeTipoProdotto].push(prodotto);
    });
  });

  return groupedProducts;
}

export function getTotalPrice(newProduct: CartProduct): number {
  let total: number = newProduct.prezzoProdotto;

  newProduct.ingredienti
    .filter((ingrediente) => ingrediente.isExtra)
    .forEach((ingrediente) => {
      total += ingrediente.prezzoIngrediente * ingrediente.quantita;
    });

  return total;
}

export function isChiuso(orarioApertura: string, orarioChiusura: string): boolean {
  const now = new Date();
  let sixAM = setSeconds(setMinutes(setHours(now, 6), 0), 0);
  if (isBefore(now, sixAM)) {
    sixAM = addDays(sixAM, 1);
  }

  const [hoursOpen, minutesOpen, secondsOpen] = orarioApertura.split(":").map(Number);
  let oraApertura = setSeconds(setMinutes(setHours(now, hoursOpen), minutesOpen), secondsOpen);

  const [hours, minutes, seconds] = orarioChiusura.split(":").map(Number);
  let oraChiusura = setSeconds(setMinutes(setHours(now, hours), minutes), seconds);

  if (isAfter(oraApertura, oraChiusura)) {
    oraChiusura = addDays(oraChiusura, 1);
  }

  return isAfter(now, oraChiusura) || isBefore(now, sixAM);
}
