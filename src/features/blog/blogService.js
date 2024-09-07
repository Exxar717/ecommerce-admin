import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getBlog = async () => {
  const response = await axios.get(`${base_url}blog/`);
  return response.data;
};

const getABlog = async (id) => {
  const response = await api.get(`blog/${id}`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await api.post(`blog/`, blog);

  return response.data;
};

const updateBlog = async (blog) => {
  const response = await api.put(
    `blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      image: blog.blogData.image,
    }
  );

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await api.delete(`blog/${id}`);

  return response.data;
};


const blogService = {
  getBlog,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
