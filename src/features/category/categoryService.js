import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getCategory = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};

const getACategory = async (id) => {
  const response = await api.get(`prodcategory/${id}`);
  return response.data;
};

const createCategory = async (category) => {
  const response = await api.post(
    `prodcategory/`,
    category
  );

  return response.data;
};

const updateCategory = async (category) => {
  const response = await api.put(
    `prodcategory/${category.id}`,
    { title: category.categoryData.title }
  );

  return response.data;
};

const deleteCategory = async (id) => {
  const response = await api.delete(`prodcategory/${id}`);

  return response.data;
};

const categoryService = {
  getCategory,
  createCategory,
  getACategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
