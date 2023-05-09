import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.error(error.response);
    // if (error.response.status === 401 || error.response.status === 422) {
    //   console.error("Unauthorized");
    //   // TODO:Logout
    // }
    return Promise.reject(error);
  }
);

export { api };
