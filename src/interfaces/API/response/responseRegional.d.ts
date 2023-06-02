// Interfaces
import {
  ICaracteristica,
  ICiudades,
  IRegional,
  IResponse,
  IResponse,
} from "../..";

export interface IResponseRegionales extends IResponse {
  regionales: IRegional[];
}

export interface IResponseRegional extends IResponse {
  caracteristicas: ICaracteristica[];
  ciudades: ICiudades[];
  tiposParqueaderos: ITiposParqueaderos[];
}
