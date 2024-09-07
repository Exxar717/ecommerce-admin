import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getColor = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

const getAColor = async (id) => {
  const response = await api.get(`color/${id}`);
  return response.data;
};

const createColor = async (color) => {
  const response = await api.post(`color/`, color);

  return response.data;
};

const updateColor = async (color) => {
  const response = await api.put(
    `color/${color.id}`,
    color.colorData
  );

  return response.data;
};

const deleteColor = async (id) => {
  const response = await api.delete(`color/${id}`);

  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getAColor,
  updateColor,
  deleteColor,
};

export default colorService;
