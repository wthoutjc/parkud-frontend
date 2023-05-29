//API
import axios from "axios";
import { api } from "../../utils";

// Interfaces
import {
  IResponse,
  IResponseSede,
  IResponseSedes,
  ISede,
} from "../../interfaces";

const registerSede = async (data: ISede): Promise<IResponse> => {
  try {
    const postData = {
      nombre: data.name,
      latitud: String(data.lat),
      longitud: String(data.lng),
      fidelizacion: data.loyalty ? "1" : "0",
      horaInicio: data.startTime,
      horaFin: data.endTime,
      tiempoCompleto: data.fullTime ? "1" : "0",
      idAdministrador: String(data.idAdmin),
      idUbicacion: String(data.city),
      caracteristicas: data.characteristics.map((c) => {
        const caracteristica = JSON.parse(c) as {
          idCaracteristica: number;
          nombre: string;
        };

        return { idCaracteristica: String(caracteristica.idCaracteristica) };
      }),
      tarifas: data.tariff.map(({ id, price, parkingSpaces }) => {
        return {
          idTipo_Parqueadero: id,
          valor: price,
          cupo: parkingSpaces,
        };
      }),
    };

    const response = await api.post("/sede/agregar", postData, {
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

const getSede = async (id: number): Promise<IResponseSede> => {
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

const getSedes = async (
  limit: number,
  offset: number
): Promise<IResponseSedes> => {
  try {
    const response = await api.get(`/sede/${limit}/${offset}`, {
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
        cuenta: 0,
      };
    }

    return {
      ...errorReturn,
      error: "Falló la solicitud al servidor",
      sedes: [],
      cuenta: 0,
    };
  }
};

export { registerSede, getSedes, getSede };
