import diagnosesData from "../../data/diagnoses";
import { DiagnosesEntry } from "../types/diagnosesTypes";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default { getDiagnoses };
