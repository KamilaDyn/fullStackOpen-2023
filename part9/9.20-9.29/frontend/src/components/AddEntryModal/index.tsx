import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import EntryModalForm from "./EntryModalForm";
import { Diagnoses, NewEntry } from "../../types";
interface AddEntryModal {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  diagnoses: Diagnoses[];
  onSubmit: (entry: NewEntry) => void;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  error,
  diagnoses,
  onSubmit,
}: AddEntryModal) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entries to patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <EntryModalForm diagnoses={diagnoses} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
