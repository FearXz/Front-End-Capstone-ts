export interface LoginDto {
  email: string;
  password: string;
}
export interface UserData {
  idUtente: number;
  nome: string;
  cognome: string;
  email: string;
  citta: string;
  indirizzo: string;
  cap: string;
  role: string;
}
export interface LoginResponse {
  token: string;
  utente: UserData;
}
export interface RegisterDto {
  email: string;
  password: string;
  nome: string;
  cognome: string;
  cellulare: string;
  indirizzo: string;
  citta: string;
  cap: string;
}
export interface CoordinateSearch {
  lat: number;
  lon: number;
  display_name: string;
}
export interface OSMResponse {
  x: number;
  y: number;
  label: string;
}
export interface categorieRistorante {
  idCategorie: number;
  nomeCategoria: string;
}
export interface GiorniDiChiusura {
  nomeGiorno: string;
  numeroGiorno: number;
}
export interface ListaRistorantiResponse {
  idAzienda: number;
  idRistorante: number;
  nomeRistorante: string;
  tagRistorante: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
  distanza: number;
}
export interface IngredientiProdottiLocale {
  idIngrediente: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
}
export interface TipiProdottoLocale {
  idTipoProdotto: number;
  nomeTipoProdotto: string;
}
export interface ProdottiLocale {
  idProdottoRistorante: number;
  nomeProdotto: string;
  prezzoProdotto: number;
  descrizioneProdotto: string | null;
  imgProdotto: string | null;
  ingredienti: IngredientiProdottiLocale[];
  tipiProdotto: TipiProdottoLocale[];
}
export interface LocaleIdResponse {
  idAzienda: number;
  partitaIva: string;
  idRistorante: number;
  nomeRistorante: string;
  indirizzo: string;
  citta: string;
  cap: string;
  latitudine: string;
  longitudine: string;
  telefono: string;
  orarioApertura: string;
  orarioChiusura: string;
  imgCopertina: string | null;
  imgLogo: string | null;
  descrizione: string | null;
  ingredientiRistorante: IngredientiProdottiLocale[];
  categorieRistorante: categorieRistorante[];
  giorniDiChiusura: GiorniDiChiusura[];
  prodotti: ProdottiLocale[];
}
export interface CartIngredient {
  idIngrediente: number;
  nomeIngrediente: string;
  prezzoIngrediente: number;
  quantita: number;
  isExtra: boolean;
}
export interface CartProduct {
  idProdotto: number;
  uniqueId: string;
  nomeProdotto: string;
  prezzoProdotto: number;
  quantita: number;
  totale?: number;
  ingredienti: CartIngredient[];
}
export interface CartOrderDto {
  idRistorante: number;
  indirizzoDiConsegna: string;
  orarioConsegnaPrevista: string;
  note?: string;
  totale?: number;
  prodotti: CartProduct[];
}
