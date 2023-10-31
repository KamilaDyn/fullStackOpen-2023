import { Diagnoses, Entry } from "../../types";
import OccupationalHealthcare from "../OccupationalHealthcare";
import HealthCheck from "../HealthCheck";
import Hospital from "../Hospital";
import { HealthCheckType } from "../../enum";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnoses[] }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case HealthCheckType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case HealthCheckType.HealthCheck:
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case HealthCheckType.Hospital:
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    default:
      return null;
  }
};

export default EntryDetails;
