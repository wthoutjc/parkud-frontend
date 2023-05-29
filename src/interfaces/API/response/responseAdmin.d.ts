// Interfaces
import { IResponse } from "../..";

interface IAdmin {
  idAdministrador: number;
  nombre: string;
}

export interface IResponseAdmins extends IResponse {
  admins: IAdmin[];
}
