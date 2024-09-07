import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getBrand = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};

const getABrand = async (id) => {
  const response = await api.get(`brand/${id}`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await api.post(`brand/`, brand);

  return response.data;
};

const updateBrand = async (brand) => {
  const response = await api.put(`brand/${brand.id}`, {title: brand.brandData.title});

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await api.delete(`brand/${id}`);

  return response.data;
};

const brandService = {
  getBrand,
  createBrand,
  getABrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
