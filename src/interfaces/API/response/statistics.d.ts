// Interfaces
import { IResponse } from "../../../interfaces";

export interface IResponseStatisticCupos {
  porcentaje: number;
  tipoParqueadero: string;
}

export interface IResponseStatisticReserva {
  cantidad: number;
  mes: string;
}

export interface IResponseStatisticGanancia {
  ganancias: string;
  mes: string;
}

export interface IResponseStatistics extends IResponse {
  estadistica: IResponseStatisticCupos[] | IResponseStatisticReserva[];
}
