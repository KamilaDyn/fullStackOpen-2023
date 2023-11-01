import {
  Alert,
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
import { HealthCheckRating, HealthCheckType } from "../../enum";
import { Diagnoses, Discharge, NewEntry, SickLeave } from "../../types";

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
const modifiedString = (originalString: string) => {
  return originalString.replace(/([a-z])([A-Z])/g, "$1 $2");
};

const healthCheckTypeArray = Object.values(HealthCheckType).map((type) => {
  return {
    value: type,
    label: modifiedString(type),
  };
});

interface EntryModalFormProps {
  diagnoses: Diagnoses[];
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  error?: string;
}
const EntryModalForm = ({
  diagnoses,
  onSubmit,
  onClose,
  setError,
  error,
}: EntryModalFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosesCodes] = useState<
    Array<Diagnoses["code"]>
  >([]);
  const [specialist, setSpecialist] = useState("");
  const [type, setType] = useState(HealthCheckType.HealthCheck);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const handleSickLeave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSickLeave((prevDate) => ({ ...prevDate, [name]: value }));
  };
  const handleDischarge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDischarge((prevValue) => ({ ...prevValue, [name]: value }));
  };

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
  const onHealthCheckType = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthCheck = Object.values(HealthCheckType).find(
        (g) => g.toString() === value
      );
      if (healthCheck) {
        setType(healthCheck);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const basicEntries = {
      description,
      date,
      diagnosisCodes,
      specialist,
    };

    const isBasicValues =
      description !== "" && specialist !== "" && date !== "";
    const isOccupationsValues =
      sickLeave.startDate !== "" &&
      sickLeave.endDate !== "" &&
      employerName !== "";
    const isHospitalValues = discharge.date !== "" && discharge.criteria !== "";
    switch (type) {
      case HealthCheckType.HealthCheck:
        if (isBasicValues) {
          onSubmit({
            ...basicEntries,
            type: type,
            healthCheckRating: healthCheckRating,
          });
          setError(undefined);
        } else {
          setError("Please fill in the missing data");
        }
        break;
      case HealthCheckType.OccupationalHealthcare:
        if (isOccupationsValues) {
          onSubmit({
            ...basicEntries,
            type: type,
            sickLeave,
            employerName,
          });

          setError(undefined);
        } else {
          setError("Please fill in the missing data");
        }
        break;
      case HealthCheckType.Hospital:
        if (isHospitalValues) {
          onSubmit({
            ...basicEntries,
            type: type,
            discharge,
          });
          setError(undefined);
        } else {
          setError("Please fill in the missing data");
        }

        break;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography>New entry</Typography>
      <Box onSubmit={addEntry} component="form" noValidate={false}>
        <Select
          label="health check type"
          fullWidth
          value={type}
          onChange={(e) => onHealthCheckType(e)}
        >
          {healthCheckTypeArray.map(({ value, label }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          error={!description}
          size="small"
          margin="normal"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          helperText={!description && "Description required"}
        />

        <TextField
          error={!date}
          size="small"
          margin="normal"
          label="Date"
          fullWidth
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          helperText={!description && "Date required"}
        />
        <TextField
          error={!specialist}
          size="small"
          margin="normal"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          helperText={!specialist && "Specialist required"}
        />
        {type === HealthCheckType.OccupationalHealthcare && (
          <>
            <TextField
              error={!employerName}
              size="small"
              margin="normal"
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              helperText={!employerName && "Employer name required"}
            />
            <TextField
              error={!sickLeave.startDate}
              size="small"
              margin="normal"
              label="Start date"
              fullWidth
              name="startDate"
              value={sickLeave.startDate}
              onChange={handleSickLeave}
              helperText={!sickLeave.startDate && "Start date required"}
            />
            <TextField
              error={!sickLeave.endDate}
              size="small"
              margin="normal"
              label="End date"
              name="endDate"
              fullWidth
              value={sickLeave.endDate}
              onChange={handleSickLeave}
              helperText={!sickLeave.endDate && "End date required"}
            />
          </>
        )}
        {type === HealthCheckType.HealthCheck && (
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
        )}
        {type === HealthCheckType.Hospital && (
          <>
            <TextField
              error={!discharge.date}
              size="small"
              margin="normal"
              label="Discharge date"
              fullWidth
              name="date"
              value={discharge.date}
              onChange={handleDischarge}
              helperText={!discharge.date && "date required"}
            />
            <TextField
              error={!discharge.criteria}
              size="small"
              margin="normal"
              label="Discharge criteria"
              fullWidth
              name="criteria"
              value={discharge.criteria}
              onChange={handleDischarge}
              helperText={!discharge.criteria && "describe criteria required"}
            />
          </>
        )}

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
        {error && <Alert severity="error">{error}</Alert>}

        <Box
          sx={{ marginTop: "2em" }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default EntryModalForm;
