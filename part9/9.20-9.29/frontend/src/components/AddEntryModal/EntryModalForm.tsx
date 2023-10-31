import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
  SelectChangeEvent,
  Select,
  Button,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { HealthCheckRating } from "../../enum";
import { Diagnoses, NewEntry } from "../../types";

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingArray: HealthCheckRatingOptions[] = Object.entries(
  HealthCheckRating
).map(([rating, values]) => {
  return {
    label: rating,
    value: values,
  };
});

interface EntryModalFormProps {
  diagnoses: Diagnoses[];
  onSubmit: (entry: NewEntry) => void;
}
const EntryModalForm = ({ diagnoses, onSubmit }: EntryModalFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosesCodes] = useState<
    Array<Diagnoses["code"]>
  >([]);
  const [specialist, setSpecialist] = useState("");

  const handleDiagnosisChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setDiagnosesCodes((prevDiagnoses) => [
        ...prevDiagnoses,
        event.target.name,
      ]);
    } else {
      setDiagnosesCodes((prevDiagnoses) =>
        prevDiagnoses.filter((code) => code !== event.target.name)
      );
    }
  };

  const onHealthRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCareRating = Object.values(HealthCheckRating).find(
        (g) => g.toString() === value
      );
      if (healthCareRating) {
        setHealthCheckRating(healthCareRating);
      }
    }
  };

  const rating = healthCheckRatingArray.find(
    (h) => h.value === healthCheckRating
  )?.value;

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      healthCheckRating: rating as HealthCheckRating,
      diagnosisCodes,
      specialist,
    });
  };
  return (
    <Box>
      <Typography>New Health Check Entry</Typography>
      <form onSubmit={addEntry}>
        <TextField
          size="small"
          margin="normal"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          size="small"
          margin="normal"
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          size="small"
          margin="normal"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <Select
          label="health check rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthRatingChange}
        >
          {healthCheckRatingArray.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>

        <FormGroup>
          {diagnoses.map((diagnosis) => (
            <FormControlLabel
              key={diagnosis.name}
              label={diagnosis.name}
              name={diagnosis.code}
              control={<Checkbox onChange={(e) => handleDiagnosisChange(e)} />}
            />
          ))}
        </FormGroup>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
};
export default EntryModalForm;
