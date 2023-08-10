import axios from "axios";
import baseUrl from "../config";

const login = async (newObject) => {
  const response = await axios.post(baseUrl.login, newObject);
  console.log(baseUrl.login, newObject);
  return response.data;
};

export { login };
