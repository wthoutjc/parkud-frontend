export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  hierarchy: "SuperAdmin" | "Admin" | "Operator" | "User" | "";
  expires: number;
}
