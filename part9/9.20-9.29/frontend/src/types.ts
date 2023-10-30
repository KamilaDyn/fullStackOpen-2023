export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
interface Entry {}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}
export interface SinglePatient extends Patient {
  entires: Entry;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
