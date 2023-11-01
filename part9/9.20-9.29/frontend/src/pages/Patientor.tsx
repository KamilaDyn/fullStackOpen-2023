import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import { SinglePatient, Diagnoses, NewEntry } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../components/EntryDetails/EntryDetails";
import AddEntryModal from "../components/AddEntryModal";
import { Gender } from "../enum";
import axios from "axios";
const Patientor = ({ diagnoses }: { diagnoses: Diagnoses[] }) => {
  const [patientor, setPatientor] = useState<SinglePatient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const patientObject = await patientsService.getPatient(id as string);
      setPatientor(patientObject);
    };
    void fetchPatient();
  }, [id]);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError("");
  };
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

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const newEntries = await patientsService.addNewEntryToPatient(
        id as string,
        values
      );
      setPatientor((prevValues) => {
        if (prevValues) {
          return {
            ...prevValues,
            entries: [...prevValues.entries, newEntries],
          };
        }
        return prevValues;
      });
      if (newEntries) {
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
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
            <Box key={entry.date}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </Box>
          ))}
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        diagnoses={diagnoses}
        onSubmit={submitNewEntry}
        setError={setError}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </Container>
  );
};

export default Patientor;
