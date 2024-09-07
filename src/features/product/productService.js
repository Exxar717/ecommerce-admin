import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from "../../utils/config";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await api.post(`product/`, product);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
};

export default productService;
