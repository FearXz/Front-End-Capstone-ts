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
export interface Coordinate {
  lat: number;
  lon: number;
  display_name: string;
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
export interface categorieRistorante {
  idCategorie: number;
  nomeCategoria: string;
}
export interface ListaRistorantiResponse {
  idAzienda: number;
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
  categorieRistorante: categorieRistorante[];
  distanza: number;
}
