import axios from "axios";
import baseUrl from "../config";
import { getToken } from "../storage";

const getAll = () => {
  const request = axios.get(baseUrl.blogs);
  return request.then((response) => response.data);
};

const createBlog = async (newBlog) => {
  const token = getToken();
  console.log("tokenw", token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl.blogs, newBlog, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export { getAll, createBlog };
