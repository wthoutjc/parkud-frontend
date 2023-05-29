// Interfaces
import { IResponse } from "../..";

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

export interface IResponseSede extends IResponse {
  caracteristicas: ICaracteristica[];
  ciudades: ICiudades[];
  tiposParqueaderos: ITiposParqueaderos[];
}

export interface IResponseSedes extends IResponse {
  sedes: { idSede: string; nombre: string }[];
  cuenta: number;
}
