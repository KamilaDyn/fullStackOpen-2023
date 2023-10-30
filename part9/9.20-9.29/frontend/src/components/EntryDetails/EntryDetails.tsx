import { Diagnoses, Entry } from "../../types";
import OccupationalHealthcare from "../OccupationalHealthcare";
import HealthCheck from "../HealthCheck";
import Hospital from "../Hospital";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnoses[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
