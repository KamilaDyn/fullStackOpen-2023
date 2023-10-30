import { HealthCheckRating } from "../enum";
import { DiagnosesEntry } from "./diagnosesTypes";

export type Gender = "male" | "female" | "other";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealthcareEntry;

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
