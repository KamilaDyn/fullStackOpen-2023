import patientsData from "../../data/patients";
import {
  PatientsData,
  NonSensitivePatientsEntry,
  NewPatientEntry,
} from "../types/patientsType";
import { v1 as uuid } from "uuid";

const id = uuid();

const patients: PatientsData[] = patientsData;

const getPatients = (): Omit<PatientsData, "entries">[] => {
  return patients;
};

const getNonSensitiveDPatientsEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry) => {
  const newPatientEntry = {
    id: id,
    ...patient,
    entries: [],
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): PatientsData | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

export default {
  getPatients,
  getNonSensitiveDPatientsEntries,
  addPatient,
  findPatientById,
};
