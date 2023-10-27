import patientsData from "../../data/patients";
import {
  PatientsData,
  NonSensitivePatientsEntry,
  NewPatientEntry,
} from "../types/patientsType";
import { v1 as uuid } from "uuid";

const id = uuid();

const patients: PatientsData[] = patientsData;

const getPatients = (): PatientsData[] => {
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

const addPatient = (patient: NewPatientEntry): PatientsData => {
  const newPatientEntry = {
    id: id,
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, getNonSensitiveDPatientsEntries, addPatient };
