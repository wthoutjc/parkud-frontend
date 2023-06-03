//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  ICaracteristica,
  IClientReserva,
  IFindSede,
  IResponse,
  IResponseCreditCards,
  IResponseFindSedes,
  ITiposParqueaderos,
} from "../../interfaces";

const reservar = async (data: IClientReserva): Promise<IResponse> => {
  try {
    const postData = {
      idSede: String(data.idSede),
      idTarjeta: String(data.idCard),
      horaInicio: String(data.startTime),
      horaSalida: String(data.endTime),
    };

    const response = await api.post(`/reserva/reservar`, postData, {
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

const getCreditCards = async (): Promise<IResponseCreditCards> => {
  try {
    const response = await api.get(`/usuario/tarjetas`, {
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
        tarjetas: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      tarjetas: [],
    };
  }
};

const findSedes = async (data: IFindSede): Promise<IResponseFindSedes> => {
  try {
    const postData = {
      region: String(data.regional),
      ciudad: String(data.city),
      caracteristicas: data.characteristics.map((item) => {
        const itemParsed = JSON.parse(item) as ICaracteristica;
        return {
          idCaracteristica: String(itemParsed.idCaracteristica),
        };
      }),

      tiposParqueaderos: data.typesParking.map((item) => {
        const itemParsed = JSON.parse(item) as ITiposParqueaderos;
        return {
          idTipo_Ubicacion: String(itemParsed.idTipo_Parqueadero),
        };
      }),
      hora_inicio: String(data.startTime),
      hora_fin: String(data.endTime),
      fidelizacion: data.loyalty ? "1" : "0",
    };

    const response = await api.post(`/sede/buscar-sede`, postData, {
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
        sedes: [],
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      sedes: [],
    };
  }
};

export { reservar, getCreditCards, findSedes };
