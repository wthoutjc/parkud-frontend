export type Hierarchy = "C" | "S" | "A" | "O" | "";

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  hierarchy: Hierarchy;
}
