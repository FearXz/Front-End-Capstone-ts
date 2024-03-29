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
