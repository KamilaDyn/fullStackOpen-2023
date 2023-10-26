import express from "express";
import patientsService from "../services/patientsService";
const router = express.Router();
router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveDPatientsEntries());
});

export default router;