import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { Gender, SinglePatient, Diagnoses } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../components/EntryDetails/EntryDetails";

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
        {!!patientor.entries.length &&
          patientor.entries.map((entry) => (
            <Box key={entry.id}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Patientor;
