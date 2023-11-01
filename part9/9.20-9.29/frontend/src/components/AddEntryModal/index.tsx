import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import EntryModalForm from "./EntryModalForm";
import { Diagnoses, NewEntry } from "../../types";
interface AddEntryModal {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  diagnoses: Diagnoses[];
  onSubmit: (entry: NewEntry) => void;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  error,
  diagnoses,
  onSubmit,
  setError,
}: AddEntryModal) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entries to patient</DialogTitle>
      <Divider />
      <DialogContent>
        <EntryModalForm
          diagnoses={diagnoses}
          onSubmit={onSubmit}
          onClose={onClose}
          setError={setError}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
