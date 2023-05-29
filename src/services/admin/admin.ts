//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  INewAdministrador,
  IResponse,
  IResponseAdmins,
} from "../../interfaces";

const registerAdmin = async (data: INewAdministrador): Promise<IResponse> => {
  try {
    const postData = {
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      documentoIdentidad: data.documento,
      usuario: data.idusuario,
    };

    const response = await api.post(
      "/usuario/agregar_administrador",
      postData,
      {
        headers: {
          Authorization: `${localStorage.getItem("token-parkud")}`,
        },
      }
    );

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

const getAdmins = async (): Promise<IResponseAdmins> => {
  try {
    const response = await api.get(`/usuario/admins/todos`, {
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
        admins: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      admins: [],
    };
  }
};

export { getAdmins, registerAdmin };
