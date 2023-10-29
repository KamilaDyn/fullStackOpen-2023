export type Gender = "male" | "female" | "other";

export interface Entry {}
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
