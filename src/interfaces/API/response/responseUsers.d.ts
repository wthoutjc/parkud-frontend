// Interfaces
import { IResponse } from "../..";

export interface IResponseAllUser {
  correo: string;
  usuario: string;
  idUsuario: number;
}

export interface IResponseAllUsers extends IResponse {
  usuarios: IResponseAllUser[];
}
