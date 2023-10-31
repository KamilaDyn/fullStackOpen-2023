import { Gender, HealthCheckRating, HealthCheckType } from "./src/enum";
import {
  NewEntry,
  NewPatientEntry,
  Discharge,
  SickLeave,
} from "./src/types/patientsType";
import { DiagnosesEntry } from "./src/types/diagnosesTypes";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
function isNumber(numberValue: unknown): numberValue is number {
  return typeof numberValue === "number" || numberValue instanceof Number;
}

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
const parseType = (name: unknown, type: string): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing ${type}`);
  }
  return name;
};

const parseDiagnosisCode = (object: unknown): Array<DiagnosesEntry["code"]> => {
  if (!object || typeof object !== "object" || !Array.isArray(object)) {
    return [] as Array<DiagnosesEntry["code"]>;
  }
  const diagnosisCodes = object as string[];

  if (diagnosisCodes.every((code) => typeof code === "string")) {
    return diagnosisCodes;
  } else {
    return [];
  }
};
const isHealthCheckRating = (params: number): params is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(params);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect rating value");
  }
  return rating;
};
const isHealthCheckType = (params: string): params is HealthCheckType => {
  return Object.values(HealthCheckType)
    .map((v) => v.toString())
    .includes(params);
};

const parseHealthCheckType = (healthType: unknown): HealthCheckType => {
  if (!healthType || !isString(healthType) || !isHealthCheckType(healthType)) {
    throw new Error("Incorrect health check type");
  }
  return healthType;
};

const perseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !isString(discharge.date) ||
    !("criteria" in discharge) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect date or criteria");
  }
  const dischargeObject: Discharge = {
    date: discharge.date,
    criteria: discharge.criteria,
  };
  return dischargeObject;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !("endDate" in sickLeave) ||
    !isString(sickLeave.endDate)
  ) {
    throw new Error("Incorrect startDate or end Date in sick leave");
  }
  const sickLeaveObject: SickLeave = {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  };
  return sickLeaveObject;
};
const newEntryForPatient = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const newEntry = {
      description: parseType(object.description, "description"),
      date: parseType(object.date, "date"),
      specialist: parseType(object.specialist, "specialist name"),
      diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
      type: parseHealthCheckType(object.type),
    };

    switch (newEntry.type) {
      case HealthCheckType.HealthCheck:
        if ("healthCheckRating" in object) {
          return {
            ...newEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        } else {
          throw new Error("Incorrect data: missing discharge information");
        }

      case HealthCheckType.Hospital:
        if ("discharge" in object) {
          return {
            ...newEntry,
            discharge: perseDischarge(object.discharge as Discharge),
          };
        } else {
          throw new Error("Incorrect data: missing discharge information");
        }
      case HealthCheckType.OccupationalHealthcare:
        if ("employerName" in object) {
          const occupationHealthcareObject: NewEntry = {
            ...newEntry,
            employerName: parseType(
              object.employerName,
              "name of the employer"
            ),
          };

          if ("sickLeave" in object) {
            occupationHealthcareObject.sickLeave = parseSickLeave(
              object.sickLeave
            );
          }
          return occupationHealthcareObject;
        } else {
          throw new Error("Incorrect data: missing discharge information");
        }
      default:
        throw new Error("Unhandled entry type");
    }
  }
  throw new Error("Incorrect data: a field missing");
};

export { newPatientEntry, newEntryForPatient };
