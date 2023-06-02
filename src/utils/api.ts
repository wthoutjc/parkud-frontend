import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response.status === 401 ||
      error.response.status === 422 ||
      error.response.status === 500
    ) {
      console.error("[ERROR] Unauthorized");
    }
    return Promise.reject(error);
  }
);

export { api };
