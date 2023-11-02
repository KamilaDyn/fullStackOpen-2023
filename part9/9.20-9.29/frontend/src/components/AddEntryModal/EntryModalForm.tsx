import {
  Alert,
  Box,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  SelectChangeEvent,
  Select,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { HealthCheckRating, HealthCheckType } from "../../enum";
import { Diagnoses, Discharge, NewEntry, SickLeave } from "../../types";
import { DatePicker, DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type DiagnosesArray = Array<Diagnoses["code"]>;

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
  const [date, setDate] = useState("2023-11-01");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosesCodes] = useState<DiagnosesArray>([]);
  const [specialist, setSpecialist] = useState("");
  const [type, setType] = useState(HealthCheckType.HealthCheck);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "2023-11-01",
    endDate: "2023-11-01",
  });
  const [discharge, setDischarge] = useState<Discharge>({
    date: "2023-11-01",
    criteria: "",
  });

  const handleDateChange = (e: Dayjs | null) => {
    const newFormatDate = e?.format("YYYY-MM-DD");
    setDate(newFormatDate as string);
  };
  const handleSickLeave = (name: string, value: Dayjs | null) => {
    setSickLeave((prevDate) => ({
      ...prevDate,
      [name]: value?.format("YYYY-MM-DD"),
    }));
  };

  const handleDischarge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDischarge((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<DiagnosesArray>) => {
    setDiagnosesCodes(event.target.value as DiagnosesArray);
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
        const isValidDate =
          sickLeave.startDate !== "Invalid Date" &&
          sickLeave.endDate !== "Invalid Date";

        if (isOccupationsValues && isValidDate) {
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
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="check-type-label">health check type</InputLabel>
          <Select
            labelId="check-type-label"
            label="health check type"
            value={type}
            onChange={(e) => onHealthCheckType(e)}
          >
            {healthCheckTypeArray.map(({ value, label }) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          error={!description}
          fullWidth
          size="small"
          margin="normal"
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          helperText={!description && "Description required"}
        />
        <DatePicker
          label="Date"
          value={dayjs(date)}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          maxDate={dayjs("2025-12-31")}
          minDate={dayjs("2020-01-01")}
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
            <Box display={"flex"} justifyContent={"space-between"}>
              {" "}
              <DateField
                required
                label="Start date"
                value={dayjs(sickLeave.startDate)}
                onChange={(newValue) => handleSickLeave("startDate", newValue)}
                format="YYYY-MM-DD"
                maxDate={dayjs("2025-12-31")}
                minDate={dayjs("2020-01-01")}
                name="startDate"
                helperText={
                  sickLeave.startDate === "Invalid Date" && "invalid start date"
                }
              />
              <DateField
                required
                label="End date"
                value={dayjs(sickLeave.endDate)}
                onChange={(newValue) => handleSickLeave("endDate", newValue)}
                format="YYYY-MM-DD"
                maxDate={dayjs("2025-12-31")}
                minDate={dayjs("2020-01-01")}
                name="endDate"
                helperText={
                  sickLeave.endDate === "Invalid Date" && "invalid end date"
                }
              />
            </Box>
          </>
        )}
        {type === HealthCheckType.HealthCheck && (
          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel id="check-rating-label">Health check rating</InputLabel>
            <Select
              labelId="check-rating-label"
              label="health check rating"
              value={healthCheckRating}
              onChange={onHealthRatingChange}
              input={<OutlinedInput label="Diagnosis code" />}
            >
              {healthCheckRatingArray.map(({ label, value }) => (
                <MenuItem key={label} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">
            Diagnosis code
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={diagnosisCodes}
            onChange={(e) => handleDiagnosisChange(e)}
            input={<OutlinedInput label="Diagnosis code" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox
                  checked={diagnosisCodes.indexOf(diagnosis.code) > -1}
                />
                <ListItemText primary={diagnosis.code} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
