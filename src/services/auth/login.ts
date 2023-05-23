//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  IAPILogin,
  ILogin,
  IResponseTwoFactor,
  IResponseLogIn,
  IResponse,
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

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.error || "Falló la solicitud al servidor",
        success: false,
        cambiarContrasena: 0,
      };
    }

    return {
      error: "Falló la solicitud al servidor",
      success: false,
      cambiarContrasena: 0,
    };
  }
};

const updatePassword = async (password: string): Promise<IResponse> => {
  try {
    const response = await api.put(
      `/usuario/cambiar_contrasena`,
      { nueva_contrasena: password },
      {
        headers: {
          Authorization: `${localStorage.getItem("token-up")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

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

const getUser = async (): Promise<IResponseLogIn> => {
  try {
    const response = await api.get(`/usuario/obtener_usuario`, {
      headers: {
        Authorization: `${localStorage.getItem("token-parkud")}`,
      },
    });

    return response.data;
  } catch (error) {
    const errorReturn = {
      success: false,
      user: null,
    };

    if (axios.isAxiosError(error)) {
      return {
        ...errorReturn,
        error: error.response?.data.error || "Falló la solicitud al servidor",
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
    };
  }
};

export { logIn, twoFactor, updatePassword, getUser };
