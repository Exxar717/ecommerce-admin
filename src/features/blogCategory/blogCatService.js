import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getBlogCat = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const getABlogCat = async (id) => {
  const response = await api.get(`blogcategory/${id}`);
  return response.data;
};

const createBlogCat = async (blogCat) => {
  const response = await api.post(
    `blogcategory/`,
    blogCat
  );

  return response.data;
};

const updateBlogCat = async (blogCat) => {
  const response = await api.put(
    `blogcategory/${blogCat.id}`,
    { title: blogCat.blogCatData.title }
  );

  return response.data;
};

const deleteBlogCat = async (id) => {
  const response = await api.delete(`blogcategory/${id}`);

  return response.data;
};

const blogCatService = {
  getBlogCat,
  createBlogCat,
  getABlogCat,
  updateBlogCat,
  deleteBlogCat,
};

export default blogCatService;
