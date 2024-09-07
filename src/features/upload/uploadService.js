import api from "../../utils/config";

const uploadImg = async (data) => {
  const response = await api.post(`upload/`, data);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await api.delete(`upload/delete-img/${id}`);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
