// Interfaces
import { ICiudades } from ".";

export interface ICaracteristica_Sel {
  idCaracteristica: number;
  nombre: string;
}

export interface ISedeAPI {
  sede: ICaracteristica_Sel[];
  ciudad: ICiudades;
}
