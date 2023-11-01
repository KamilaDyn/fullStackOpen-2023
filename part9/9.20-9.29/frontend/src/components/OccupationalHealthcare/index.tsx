import { Card, CardContent, Typography } from "@mui/material";
import { Diagnoses, OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnoses[];
}) => {
  const diagnoseDescription = (code: Diagnoses["code"]) => {
    return diagnoses.find((d) => d.code === code)?.name;
  };
  return (
    <Card sx={{ marginBlock: "2em" }}>
      <CardContent>
        <Typography color="primary">{entry.date}</Typography>
        <Typography> {entry.description}</Typography>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} <span>{diagnoseDescription(code)}</span>
            </li>
          ))}
        </ul>
        {entry?.sickLeave && (
          <Typography>
            Sick leave form {entry?.sickLeave.startDate} to{" "}
            {entry?.sickLeave.endDate}
          </Typography>
        )}
        <Typography variant="body2">
          Diagnosed by: {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OccupationalHealthcare;
