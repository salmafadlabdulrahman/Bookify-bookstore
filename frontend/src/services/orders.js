import API from "./api";

export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

export const getUserOrders = async () => {
  const { data } = await API.get("/orders");
  return data;
};

// Admin only
export const getAllOrders = async () => {
  const { data } = await API.get("/orders/admin/all");
  return data;
};

export const markAsPaid = async (orderId) => {
  const { data } = await API.put(`/orders/${orderId}/pay`);
  return data;
};

export const markAsDelivered = async (orderId) => {
  const { data } = await API.put(`/orders/${orderId}/deliver`);
  return data;
};