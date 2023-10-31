import { HealthCheckRating } from "../enum";
import { DiagnosesEntry } from "./diagnosesTypes";

export type Gender = "male" | "female" | "other";

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export type HealthCheckType =
  | "HealthCheck"
  | "Hospital"
  | "OccupationalHealthcare";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: HealthCheckType;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: HealthCheckType;
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: HealthCheckType;
  employerName: string;
  sickLeave?: SickLeave;
}
export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

export interface PatientsData {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth: string;
  gender: Gender;
  entries: Entry[];
  id: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsData, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientsData, "id">;
