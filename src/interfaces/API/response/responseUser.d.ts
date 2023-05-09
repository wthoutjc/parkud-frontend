// Interfaces
import { IResponse } from "../..";

export interface IResponseUser extends IResponse {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
}
