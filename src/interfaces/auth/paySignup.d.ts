export interface IPaySignUp {
  cardNumber: string;
  cardName: string;
  cardDate: string;
  cardCvv: string;
  cardType: "C" | "D" | "Seleccionar";
  idNumber: string;
}
