// Interfaces
import { IResponse } from "../../../interfaces";

export interface IExportCiudadJSON {
  ciudad: string;
  idReserva: number;
  region: string;
  sede: string;
}

export interface IExportClienteJSON {
  cliente: string;
  fechaFin: string;
  fechaInicio: string;
  idReserva: number;
  tipoParqueadero: string;
  total: string;
}

export interface IResponseExportLogs extends IResponse {
  export: string | IExportCiudadJSON[] | IExportClienteJSON[];
}
