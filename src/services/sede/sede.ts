//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IResponse } from "../../interfaces";

const getRegionales = async (): Promise<IResponse> => {
  try {
    const response = await api.get(`/obtener_regionales`, {
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
export { getRegionales };