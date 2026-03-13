import api from "./axiosInstance";

// ================= GET ALL =================
export const getAllProduct = async (
  page = 1,
  limit = 5,
  sortField,
  sortOrder,
  type,
  search,
) => {
  const res = await api.get("/product/get-all", {
    params: {
      page,
      limit,
      sortField,
      sortOrder,
      type,
      search,
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

export const searchProduct = async (keyword) => {
  const res = await api.get(`/product/search?keyword=${keyword}`);
  return res.data;
};
export const getDetailProduct = async (id) => {
  const res = await api.get(`/product/get-detail/${id}`);
  return res.data;
};
