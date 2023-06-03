// Interfaces
import { IResponse } from "../../../interfaces";

export interface IReservaExtended {
  apellidoCliente: string;
  horaInicio: string;
  horaSalida: string;
  idParqueadero: number;
  idReserva: number;
  nombreCliente: string;
  tipoParqueadero: string;
}

export interface IReserva {
  horaInicio: string;
  horaSalida: string;
  idReserva: number;
}

export interface IClientReserva {
  idSede: number;
  idCard: number | string;
  startTime: string;
  endTime: string;
}

export interface IParqueaderos {
  idParqueadero: number;
  reservas: IReserva[];
  tipoParqueadero: string;
}

export interface IStatusParqueaderos extends IResponse {
  parqueaderos: IParqueaderos[];
}

export interface IStatusReserva extends IResponse {
  reserva: IReservaExtended | null;
}
