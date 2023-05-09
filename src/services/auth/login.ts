//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  IAPILogin,
  ILogin,
  IResponseTwoFactor,
  IResponseLogIn,
} from "../../interfaces";

const logIn = async (LogIn: ILogin): Promise<IResponseLogIn> => {
  try {
    const login: IAPILogin = {
      usuario: LogIn.username,
      contrasena: LogIn.password,
    };

    const response = await api.post("/usuario/login", JSON.stringify(login), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.error || "Falló la solicitud al servidor",
        success: false,
        user: null,
      };
    }

    return {
      error: "Falló la solicitud al servidor",
      success: false,
      user: null,
    };
  }
};

const twoFactor = async (
  token: string,
  id: number
): Promise<IResponseTwoFactor> => {
  try {
    const twofactor = {
      doble_factor: token,
    };

    const response = await api.post(`/usuario/login/${id}`, twofactor, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
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

export { logIn, twoFactor };
