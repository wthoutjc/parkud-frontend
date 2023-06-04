//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  IConfiguracion,
  IGenerateReports,
  ILog,
  IResponse,
  IResponseAllUsers,
  IResponseExportLogs,
  IResponseLogs,
  IResponseSettings,
  IResponseStatistics,
  IStatistics,
} from "../../interfaces";

const getAllUSers = async (): Promise<IResponseAllUsers> => {
  try {
    const response = await api.get(`usuario/todos`, {
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
        usuarios: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      usuarios: [],
    };
  }
};

const updateSetting = async ({
  id,
  valor,
}: IConfiguracion): Promise<IResponse> => {
  try {
    const response = await api.put(
      `usuario/config-general/${id}`,
      { valor },
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

const getSettings = async (): Promise<IResponseSettings> => {
  try {
    const response = await api.get(`usuario/config-general`, {
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
        configuraciones: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      configuraciones: [],
    };
  }
};

const getStats = async (data: IStatistics): Promise<IResponseStatistics> => {
  try {
    const { regional, typeStat, idSede } = data;
    const url = `/estadisticas/${typeStat}${
      regional ? `/${regional}` : idSede ? "/0" : ""
    }${idSede ? `/${idSede}` : ""}`;

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

export {
  getAllUSers,
  updateSetting,
  getSettings,
  getStats,
  exportReport,
  unblockUser,
  getLogs,
};
