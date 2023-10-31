import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
  return data;
};
const addNewEntryToPatient = async (id: string, values: NewEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    values
  );
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  addNewEntryToPatient,
};
