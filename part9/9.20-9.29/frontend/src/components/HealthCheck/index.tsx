import { Diagnoses, HealthCheckEntry } from "../../types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { HealthCheckRating } from "../../enum";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { diagnoseDescription } from "../../utils";

const iconColor = (rate: HealthCheckRating) => {
  switch (rate) {
    case HealthCheckRating.CriticalRisk:
      return "inherit";
    case HealthCheckRating.HightRisk:
      return "info";
    case HealthCheckRating.LowRisk:
      return "success";
    case HealthCheckRating.Healthy:
      return "error";
    default:
      return "disabled";
  }
};

const HealthCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnoses[];
}) => {
  return (
    <Card sx={{ marginBlock: "2em" }}>
      <CardContent>
        <Typography color="primary">{entry.date}</Typography>
        <Typography>{entry.description}</Typography>
        <Box>
          <FavoriteIcon color={iconColor(entry.healthCheckRating)} />
        </Box>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code}: {diagnoseDescription(code, diagnoses)}
            </li>
          ))}
        </ul>
        <Typography variant="body2">
          Diagnosed by: {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCheck;
