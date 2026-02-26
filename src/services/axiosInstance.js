import axios from "axios";
import { store } from "../redux/store";
import { setAuth, clearAuth } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  //   baseURL: import.meta.env.VITE_API_URL_BACKEND,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        if (res.data?.accessToken) {
          store.dispatch(
            setAuth({
              user: res.data.user,
              accessToken: res.data.accessToken,
            }),
          );

          originalRequest.headers.Authorization =
            "Bearer " + res.data.accessToken;

          return api(originalRequest);
        }
      } catch (err) {
        store.dispatch(clearAuth());
      }
    }

    return Promise.reject(error);
  },
);

export default api;
