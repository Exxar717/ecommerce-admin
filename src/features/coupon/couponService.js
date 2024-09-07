import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getAllCoupons = async () => {
  const response = await api.get(`${base_url}coupon/`);
  return response.data;
};

const getACoupon = async (id) => {
  const response = await api.get(`coupon/${id}`);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await api.post(`coupon/`, coupon);

  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await api.put(
    `coupon/${coupon.id}`,
    coupon.couponData
  );

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await api.delete(`coupon/${id}`);

  return response.data;
};

const couponService = {
  getAllCoupons,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
