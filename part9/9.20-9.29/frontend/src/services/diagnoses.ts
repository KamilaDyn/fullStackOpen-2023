import { Diagnoses } from "../types";

import { apiBaseUrl } from "../constants";
import axios from "axios";
const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

export default { getDiagnoses };
