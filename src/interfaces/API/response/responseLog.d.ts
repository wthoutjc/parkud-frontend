// Interfaces
import { IResponse } from "../../../interfaces";

export interface IResponseLog {
  id: number;
  ip: string;
  usuario: string;
  mensaje: string;
  fecha_hora: string;
}

export interface IResponseLogs extends IResponse {
  cuenta: number;
  logs: IResponseLog[];
}
