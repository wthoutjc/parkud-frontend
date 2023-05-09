// Interfaces
import { IUser, IResponse } from "../..";

export interface IResponseLogIn extends IResponse {
  token?: string;
  user: IUser | null;
}
