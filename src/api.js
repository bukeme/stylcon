import axios from "axios";
import useAuthStore from "./components/authStore";

const handleError = (error) => {
  if (error.response?.status === 401) {
    const logout = useAuthStore.getState().logout;
    logout();
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
};
const api = axios.create({
  baseURL: "https://stylcon2.vercel.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

export default api;
