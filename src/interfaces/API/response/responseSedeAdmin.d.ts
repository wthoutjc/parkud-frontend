// Interfaces
import {
  ICaracteristica,
  ICiudades,
  IRegional,
  IResponse,
  ITiposParqueaderos,
} from "../..";

export interface ICupoAPI {
  cuenta: number;
  idTipo_Parqueadero: number;
}

export interface ITarifaAPI {
  idTarifa: number;
  idTipo_Parqueadero: number;
  valor: number;
}

export interface ISedeAdminAPI {
  cupos: ICupo[];
  fidelizacion: 1 | 0;
  horaFin: string;
  horaInicio: string;
  idSede: number;
  latitud: number;
  longitud: number;
  nombre: string;
  operarios: [];
  regional: IRegional;
  tarifas: ITarifaAPI[];
  tiempoCompleto: 1 | 0;
  caracteristicas_sel: ICaracteristica[];
  ciudad: ICiudades;
}

export interface IResponseSedeAdmin extends IResponse {
  sede: ISedeAdminAPI | null;
  caracteristicas: ICaracteristica[];
  ciudades: ICiudades[];
  regionales: IRegional[];
  tiposParqueaderos: ITiposParqueaderos[];
}
