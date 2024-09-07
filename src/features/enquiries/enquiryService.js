import axios from "axios";
import { base_url } from "../../utils/base_url";
import api from '../../utils/config';

const getEnquiry = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const getAEnquiry = async (id) => {
  const response = await api.get(`enquiry/${id}`);
  return response.data;
};

const updateEnquiry = async (enquiry) => {
  const response = await api.put(
    `enquiry/${enquiry.id}`,
    { status: enquiry.enquiryData }
  );

  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await api.delete(`enquiry/${id}`);

  return response.data;
};

const enquiryService = {
  getEnquiry,
  deleteEnquiry,
  getAEnquiry,
  updateEnquiry,
};

export default enquiryService;
