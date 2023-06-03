// Interfaces
import { IResponse } from ".";

export interface ICreditCard {
  idTarjeta: number;
  tarjeta: string;
}

export interface IResponseCreditCards extends IResponse {
  tarjetas: ICreditCard[];
}
