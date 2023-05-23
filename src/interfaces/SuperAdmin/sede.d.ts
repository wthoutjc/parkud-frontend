export interface ICharacteristic {
  id: number;
  name: string;
}

export interface ISede {
  name: string;
  idAdmin: number;
  loyalty: boolean;
  startTime: string;
  endTime: string;
  characteristics: string[];
  lat: number;
  lng: number;
  regional: string;
  city: string;
  fullTime: boolean;
  tariff: number;
}
