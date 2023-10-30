import { Card, CardContent, Typography } from "@mui/material";
import { Diagnoses, Entry } from "../../types";
import { diagnoseDescription } from "../../utils";
const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnoses[];
}) => {
  return (
    <Card sx={{ marginBlock: "2em" }}>
      <CardContent>
        <Typography color="primary">{entry.date}</Typography>
        <Typography>{entry.description}</Typography>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li>
              {code}: {diagnoseDescription(code, diagnoses)}
            </li>
          ))}
        </ul>
        <Typography>
          {entry.discharge.criteria}: at {entry.discharge.date}
        </Typography>
        <Typography variant="body2" mt={"0.5em"}>
          Diagnosed by: {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Hospital;
