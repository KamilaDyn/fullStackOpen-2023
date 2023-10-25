import diagnosesData from "../../data/diagnoses";
import {
  DiagnosesEntry,
  NonSensitiveDiagnosesEntry,
} from "../types/diagnosesTypes";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

const getNonSensitiveDiagnosesEntries = (): NonSensitiveDiagnosesEntry[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin,
  }));
};

export default { getDiagnoses, getNonSensitiveDiagnosesEntries };
