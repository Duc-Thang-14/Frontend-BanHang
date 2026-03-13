import api from "./axiosInstance"; // file axios instance của bạn

// Tạo đơn hàng
export const createOrder = async (data) => {
  const res = await api.post("/order/create", data);
  return res.data;
};

// Lấy danh sách đơn hàng của user
export const getMyOrders = async () => {
  const res = await api.get("/order/my-orders");
  return res.data;
};

// Lấy chi tiết đơn hàng
export const getOrderDetail = async (orderId) => {
  const res = await api.get(`/order/get-detail/${orderId}`);
  return res.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/order/status/${orderId}`, {
    status,
  });

  return res.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/order/get-all");
  return res.data;
};
