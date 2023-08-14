import axios from "axios";
import baseUrl from "../config";
import { getToken } from "../storage";

const getAll = async () => {
  const request = await axios.get(baseUrl.blogs);
  return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
  const token = getToken();
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl.blogs, newBlog, config);
  return response.data;
};

const updateBlog = async (id, newObject) => {
  const token = getToken();

  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(`${baseUrl.blogs}/${id}`, newObject, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const token = getToken();

  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl.blogs}/${id}`, config);
  return request.data;
};

export { getAll, createBlog, updateBlog, deleteBlog };
