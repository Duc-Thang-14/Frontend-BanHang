import api from "./axiosInstance";

// ================= GET ALL =================
export const getAllProduct = async (
  page = 1,
  limit = 5,
  sortField,
  sortOrder,
  type,
) => {
  const res = await api.get("/product/get-all", {
    params: {
      page,
      limit,
      sortField,
      sortOrder,
      type,
    },
  });

  return res.data;
};

// ================= CREATE =================
export const createProduct = async (data) => {
  const res = await api.post("/product/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ================= UPDATE =================
export const updateProduct = async (id, data) => {
  const res = await api.put(`/product/update/${id}`, data);
  return res.data;
};

// ================= DELETE ONE =================
export const deleteProduct = async (id) => {
  const res = await api.delete(`/product/delete/${id}`);
  return res.data;
};

// ================= DELETE MANY =================
export const deleteManyProduct = async (ids) => {
  const res = await api.post("/product/delete-many", {
    ids,
  });
  return res.data;
};
export const getAllType = async () => {
  const res = await api.get("/product/get-all-type");
  return res.data;
};
