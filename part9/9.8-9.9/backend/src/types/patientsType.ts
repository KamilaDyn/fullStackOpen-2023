export type Gender = "male" | "female" | "other";
export interface PatientsData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsData, "ssn">;

export type NewPatientEntry = Omit<PatientsData, "id">;
