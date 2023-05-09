//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IAPILogin, ILogin, IResponse } from "../../interfaces";

const logIn = async (LogIn: ILogin): Promise<IResponse> => {
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

export { logIn };
