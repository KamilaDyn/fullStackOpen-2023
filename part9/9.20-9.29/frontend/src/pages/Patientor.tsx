import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { Entry, Gender, SinglePatient, Diagnoses } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const Patientor = ({ diagnoses }: { diagnoses: Diagnoses[] }) => {
  const [patientor, setPatient] = useState<SinglePatient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const patientObject = await patientsService.getPatient(id as string);
      setPatient(patientObject);
    };
    void fetchPatient();
  }, [id]);

  if (patientor === null) {
    return <Typography>not found</Typography>;
  }
  const gender = (gender: Gender) => {
    switch (gender) {
      case "female":
        return <FemaleIcon />;
      case "male":
        return <MaleIcon />;
      default:
        <TransgenderIcon />;
    }
  };
  const diagnoseDescription = (code: Diagnoses["code"]) => {
    return diagnoses.find((d) => d.code === code)?.name;
  };

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "OccupationalHealthcare":
      case "Hospital":
        return (
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} <span>{diagnoseDescription(code)}</span>
              </li>
            ))}
          </ul>
        );
      default:
        null;
    }
  };

  return (
    <Container style={{ marginTop: "0.8em" }}>
      <Typography variant="h3">
        {patientor.name} <span>{gender(patientor.gender)}</span>
      </Typography>
      <Typography>Birth: {patientor.dateOfBirth}</Typography>
      <Typography>ssh: {patientor.ssn}</Typography>
      <Typography>occupation: {patientor.occupation}</Typography>
      <Box mt={"1em"}>
        <Typography variant="h5">Entries</Typography>
        {patientor.entries.length &&
          patientor.entries.map((entry) => (
            <Box key={entry.id}>
              <Typography variant="h6">{entry.date}</Typography>
              <Typography>{entry.description}</Typography>
              {entryDetails(entry)}
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Patientor;
