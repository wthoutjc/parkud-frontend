//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IResponseRegional, IResponseRegionales } from "../../interfaces";

const getRegionales = async (): Promise<IResponseRegionales> => {
  try {
    const response = await api.get(`/sede/obtener_regionales`, {
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
        regionales: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      regionales: [],
    };
  }
};

const getRegional = async (id: string): Promise<IResponseRegional> => {
  try {
    const response = await api.get(`/sede/obtener_datos/${id}`, {
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
        caracteristicas: [],
        ciudades: [],
        tiposParqueaderos: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      caracteristicas: [],
      ciudades: [],
      tiposParqueaderos: [],
    };
  }
};

export { getRegionales, getRegional };
