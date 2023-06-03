import { IResponse } from ".";

export interface IResponseSedeClient {
  idSede: number;
  estado: string;
  fidelizacion: 1 | 0;
  horaInicio: string;
  horaFin: string;
  latitud: number;
  longitud: number;
  nombre: string;
  tiempoCompleto: number;
}

export interface IResponseFindSedes extends IResponse {
  sedes: IResponseSedeClient[];
}
