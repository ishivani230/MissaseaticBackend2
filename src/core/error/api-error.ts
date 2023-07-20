export type error = { code: string; msg: string };

export enum ApiError {
  ERR1 = "Merchant Not Found",
  ERR2 = "Merchant already exists...",
  ERR3 = "Pos Not Valid",
  ERR4 = "Card is Not Valid",
  ERR5 = "You don't have Merchant Access",
}
