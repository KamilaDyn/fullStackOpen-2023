import express from "express";
import patientsService from "../services/patientsService";
import { newPatientEntry } from "../../utils";

const router = express.Router();
router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveDPatientsEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = newPatientEntry(req.body);

    const patient = patientsService.addPatient(newPatient);

    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
export default router;
