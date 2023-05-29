//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IResponseAdmins } from "../../interfaces";

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

export { getAdmins };
