// Interfaces
import { IResponse } from "../..";

interface IRegional {
  idUbicacion: number;
  descripcion: string;
}

interface ICaracteristica {
  idCaracteristica: number;
  nombre: string;
}

interface ICiudades {
  idUbicacion: number;
  descripcion: string;
}

interface ITiposParqueaderos {
  idTipo_Parqueadero: number;
  nombre: string;
}

export interface IResponseRegionales extends IResponse {
  regionales: IRegional[];
}

export interface IResponseRegional extends IResponse {
  caracteristicas: ICaracteristica[];
  ciudades: ICiudades[];
  tiposParqueaderos: ITiposParqueaderos[];
}
