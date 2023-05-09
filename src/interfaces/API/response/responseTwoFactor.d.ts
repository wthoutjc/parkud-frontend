// Interfaces
import { IResponse } from "../..";

export interface IResponseTwoFactor extends IResponse {
  token?: string;
}
