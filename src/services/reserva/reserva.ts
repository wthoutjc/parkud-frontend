//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import { IResponse, IStatusReserva } from "../../interfaces";

const sendReserva = async (correo: string): Promise<IResponse> => {
  try {
    const postData = {
      correo,
    };

    const response = await api.post(`reserva/enviar_registro`, postData, {
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

const registerOutput = async (id: string): Promise<IResponse> => {
  try {
    const response = await api.post(`/reserva/${id}/salida`, null, {
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

const registerEntry = async (id: string): Promise<IResponse> => {
  try {
    const response = await api.post(`/reserva/${id}/entrada`, null, {
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

const getReserva = async (id: string): Promise<IStatusReserva> => {
  try {
    const response = await api.get(`/reserva/${id}`, {
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
        reserva: null,
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      reserva: null,
    };
  }
};

export { sendReserva, registerOutput, registerEntry, getReserva };
