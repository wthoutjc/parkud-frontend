//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { ILog, IResponse, IResponseLogs } from "../../interfaces";

const unblockUser = async (email: string): Promise<IResponse> => {
  try {
    const response = await api.post(
      `usuario/desbloquear-usuario`,
      { correo: String(email) },
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

const getLogs = async (
  limit: number,
  offset: number,
  log: ILog
): Promise<IResponseLogs> => {
  try {
    const postData = {
      idUsuario: String(log.id),
      fechaInicio: String(log.startDate),
      fechaFin: String(log.endDate),
    };

    console.log(postData);

    const response = await api.post(
      `usuario/logs/${limit}/${offset}`,
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
        cuenta: 0,
        logs: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      cuenta: 0,
      logs: [],
    };
  }
};

export { unblockUser, getLogs };
