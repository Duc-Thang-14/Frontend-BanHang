import api from "./axiosInstance";

export const getUsers = (params) => {
  return api.get("/users/users", { params });
};

export const createUser = (data) => {
  return api.post("/users/sign-up", data);
};

export const updateUser = (id, data) => {
  return api.put(`/users/update-user/${id}`, data);
};

export const deleteUser = (id) => {
  return api.delete(`/users/delete-user/${id}`);
};

export const deleteManyUsers = (ids) => {
  return api.delete("/users/delete-many", { data: { ids } });
};
