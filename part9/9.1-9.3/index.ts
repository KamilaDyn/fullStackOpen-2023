import express, { Request, Response } from "express";
import { calculateBMI, getBMICategory } from "./bmiCalculate";
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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
