function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;

  return +(weight / (heightInMeters * heightInMeters)).toFixed(2);
}

function getBMICategory(bmi: number): string {
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
}

export { calculateBMI, getBMICategory };
