import express, { Request, Response } from "express";
import { calculateBMI, getBMICategory } from "./bmiCalculate";
import { calculateExercises } from "./exercises";
const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = parseFloat(req.query.height as string);
  const weight = parseFloat(req.query.weight as string);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBMI(height, weight);

  const category = getBMICategory(bmi);

  res.json({
    weight,
    height,
    bmi: category,
  });
});

app.get("/exercises", (req, res) => {
  if (!req.query.daily_exercises || !req.query.target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  const target = parseFloat(req.query.target as string);
  const daily_exercises = JSON.parse(req.query.daily_exercises as string);

  if (isNaN(target) || typeof daily_exercises !== "object") {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const myExercises = calculateExercises(target, daily_exercises);
  res.json(myExercises);
});
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
