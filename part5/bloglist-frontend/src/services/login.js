import axios from "axios";
import baseUrl from "../config";

const login = async (credentials) => {
  const response = await axios.post(baseUrl.login, credentials);
  return response.data;
};

export { login };
