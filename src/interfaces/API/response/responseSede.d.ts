// Interfaces
import {
  ICaracteristica,
  ICiudades,
  IResponse,
  ITiposParqueaderos,
} from "../..";

export interface IResponseSede extends IResponse {
  caracteristicas: ICaracteristica[];
  ciudades: ICiudades[];
  tiposParqueaderos: ITiposParqueaderos[];
}

export interface IResponseSedes extends IResponse {
  sedes: { idSede: string; nombre: string }[];
  cuenta: number;
}
