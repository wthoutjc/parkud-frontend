//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  IGenerateReports,
  ILog,
  IResponse,
  IResponseExportLogs,
  IResponseLogs,
  IResponseStatistics,
  IStatistics,
} from "../../interfaces";

const getStats = async (data: IStatistics): Promise<IResponseStatistics> => {
  try {
    const { regional, typeStat, idSede } = data;
    const url = `/estadisticas/${typeStat}${
      regional ? `/${regional}` : idSede ? "/0" : ""
    }${idSede ? `/${idSede}` : ""}`;

    console.log(url);

    const response = await api.get(url, {
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
        estadistica: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      estadistica: [],
    };
  }
};

const exportReport = async ({
  typeExport,
  typeReport,
}: IGenerateReports): Promise<IResponseExportLogs> => {
  try {
    const response = await api.get(`/reportes/${typeReport}/${typeExport}`, {
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
        export: "",
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      export: "",
    };
  }
};

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

export { getStats, exportReport, unblockUser, getLogs };
