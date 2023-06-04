import { IResponse } from ".";

export interface IConfiguracion {
  id: string;
  valor: string;
}

export interface IResponseSettings extends IResponse {
  configuraciones: IConfiguracion[];
}
