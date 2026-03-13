import api from "./axiosInstance";

// ================= ADD TO CART =================
export const addToCart = async (data) => {
  const res = await api.post("/cart/add", data);
  return res.data;
};

// ================= GET CART =================
export const getCart = async () => {
  const res = await api.get(`/cart/get`);
  return res.data;
};

export const updateAmount = async (productId, amount) => {
  const res = await api.put("/cart/update", {
    productId,
    amount,
  });

  return res.data;
};

// ================= REMOVE ITEM =================
export const removeItem = async (productId) => {
  const res = await api.delete(`/cart/remove/${productId}`);
  return res.data;
};

// ================= CLEAR CART =================
export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};
