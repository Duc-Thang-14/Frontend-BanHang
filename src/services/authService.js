import api from "./axiosInstance";

export const loginUser = async (data) => {
  const res = await api.post("/auth/sign-in", data);
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await api.post("/users/sign-up", data);
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh-token");
  return res.data;
};
