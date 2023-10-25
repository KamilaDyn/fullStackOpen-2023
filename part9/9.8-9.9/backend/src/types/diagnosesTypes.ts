export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}
export type NonSensitiveDiagnosesEntry = Omit<DiagnosesEntry, "code">;
