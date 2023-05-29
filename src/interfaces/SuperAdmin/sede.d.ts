import { ITableData } from "..";

export interface ICharacteristic {
  idCaracteristica: number;
  nombre: string;
}

export interface ITariff {
  id: number;
  name: string;
  price: number;
  parkingSpaces: number;
}

export interface ISede {
  name: string;
  idAdmin: string;
  loyalty: boolean;
  startTime: string;
  endTime: string;
  characteristics: string[];
  lat: number;
  lng: number;
  regional: string;
  city: string;
  fullTime: boolean;
  tariff: ITableData[];
}
