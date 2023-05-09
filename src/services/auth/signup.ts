//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IAPISignUP, IPaySignUp, ISignUp, IResponse } from "../../interfaces";

interface ISignUpService extends ISignUp, IPaySignUp {}

const SignUp = async (SignUp: ISignUpService): Promise<IResponse> => {
  try {
    const signup: IAPISignUP = {
      nombre: SignUp.name,
      apellido: SignUp.lastName,
      correo: SignUp.email,
      telefono: SignUp.phone,
      documentoIdentidad: SignUp.idNumber,
      usuario: SignUp.username,
      nombreTarjeta: SignUp.cardName,
      tipo: SignUp.cardType,
      numero: SignUp.cardNumber,
      fechaExpiracion: SignUp.cardDate,
      csv: SignUp.cardCvv,
    };

    console.log(SignUp);

    const response = await api.post(
      "/usuario/registro",
      JSON.stringify(signup),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.error || "Falló la solicitud al servidor",
        success: false,
      };
    }

    return {
      error: "Falló la solicitud al servidor",
      success: false,
    };
  }
};

export { SignUp };
