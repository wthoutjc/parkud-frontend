//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IOperator, IResponse } from "../../interfaces";

const updateOperator = async (
  operator: IOperator,
  idSede: number
): Promise<IResponse> => {
  try {
    const postData = {
      nombre: String(operator.name),
      apellido: String(operator.lastName),
      correo: String(operator.email),
      documentoIdentidad: String(operator.id),
      usuario: String(operator.user),
      idSede: String(idSede),
    };

    const response = await api.post("/usuario/operario", postData, {
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

const newOperator = async (
  operator: IOperator,
  idSede: number
): Promise<IResponse> => {
  try {
    const postData = {
      nombre: String(operator.name),
      apellido: String(operator.lastName),
      correo: String(operator.email),
      documentoIdentidad: String(operator.id),
      usuario: String(operator.user),
      idSede: String(idSede),
    };

    const response = await api.post("/usuario/operario", postData, {
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

export { updateOperator, newOperator };
