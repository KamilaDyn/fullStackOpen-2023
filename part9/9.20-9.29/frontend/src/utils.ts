import { Diagnoses } from "./types";

export const diagnoseDescription = (
  code: Diagnoses["code"],
  diagnoses: Diagnoses[]
) => {
  return diagnoses.find((d) => d.code === code)?.name;
};
