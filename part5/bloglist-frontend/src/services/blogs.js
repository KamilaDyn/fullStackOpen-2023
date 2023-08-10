import axios from "axios";
import baseUrl from "../config";

const getAll = async () => {
  const response = await axios.get(baseUrl.blogs);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
