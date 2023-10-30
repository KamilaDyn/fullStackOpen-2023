import { Gender } from "./src/enum";
import { NewPatientEntry } from "./src/types/patientsType";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};
const parseSnn = (snn: unknown): string => {
  if (!isString(snn)) {
    throw new Error("Incorrect or missing snn");
  }
  return snn;
};
const isGender = (params: string): params is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(params);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};
const newPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSnn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("Incorrect data: a field missing");
};

export { newPatientEntry };
