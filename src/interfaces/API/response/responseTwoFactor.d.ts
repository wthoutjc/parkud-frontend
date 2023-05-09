// Interfaces
import { IResponse } from "../..";

export interface IResponseTwoFactor extends IResponse {
  token?: string;
  cambiarContrasena: 1 | 0;
}
