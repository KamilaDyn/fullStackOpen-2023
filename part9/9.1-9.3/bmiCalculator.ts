const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  switch (true) {
    case bmi < 16.0:
      return "Underweight ";
    case bmi > 16.0 && bmi < 16.9:
      return "Underweight (Moderate thinness)";
    case bmi > 18.5 && bmi < 24.9:
      return "Normal (healthy weight)";
    case bmi > 25.0 && bmi < 29.9:
      return "Overweight (Pre-obese)	";
    case bmi > 30.0 && bmi < 34.9:
      return "Obese (Class I)	";
    case bmi > 35.0 && bmi < 39.9:
      return "Obese (Class II)";
    case bmi >= 40.0:
      return "Obese (Class III)	";
    default:
      throw new Error("Could not make operations");
  }
};

try {
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[3]);
  // console.log(calculateBmi(180, 150));
  console.log(calculateBmi(a, b));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
