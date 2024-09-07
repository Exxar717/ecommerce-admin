import api from '../../utils/config';

const login = async (user) => {
  const response = await api.post(
    `user/admin-login`,
    user,
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await api.get(`user/getallorders`);
  return response.data;
};

const getAnOrder = async (id) => {
  const response = await api.get(`user/getanorder/${id}`);
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await api.put(
    `user/update-status/${data.id}`,
    {status:data.status}
  );
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await api.delete(
    `user/delete-order/${id}`
  );

  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await api.get(
    `user/getMonthWiseOrderIncome`
  );
  return response.data;
};

const getYearlyStats = async () => {
  const response = await api.get(`user/getYearOrderCount`);
  return response.data;
};

const authService = {
  login,
  getOrders,
  deleteOrder,
  getMonthlyOrders,
  getYearlyStats,
  getAnOrder,
  updateOrderStatus,
};

export default authService;
