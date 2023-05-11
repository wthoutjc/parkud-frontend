export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  hierarchy: "C" | "S" | "A" | "O";
}
