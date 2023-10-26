import patientsData from "../../data/patients";
import { PatientsData, NonSensitivePatientsEntry } from "../types/patientsType";

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

// const getNonSensitiveDPatientsEntries = (): NonSensitivePatientsEntry[] => {
//   return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
//     id,
//     name,
//     dateOfBirth,
//     gender,
//     occupation,
//   }));
// };

export default { getPatients, getNonSensitiveDPatientsEntries };
