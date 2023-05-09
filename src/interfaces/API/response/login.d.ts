// Interfaces
import { IResponseUser, IResponse } from "../..";

export interface IResponseLogIn extends IResponse {
  user: IResponseUser | null;
}
