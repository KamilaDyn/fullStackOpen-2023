import { isNotNumber } from "./utils/inNotNumber";

interface Target {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface MultiplyValues {
  value1: number;
  value2: number[];
}
const parseArguments = (args: string[]): MultiplyValues => {
  if (isNotNumber(args[2])) throw new Error("First argument must be a number");

  if (!isNotNumber(args[2])) {
    return {
      value1: Number(args[2]),
      value2: args.slice(3).map((str) => parseFloat(str)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (target: number, exercises: number[]): Target => {
  const trainingsDays = exercises.filter((number) => number > 0);
  const average =
    exercises.reduce((acc, curr) => acc + curr, 0) / exercises.length;

  const rating = () => {
    switch (true) {
      case average < target / 2:
        return "You did't reach your goals, could be better";
      case average >= target / 2 && average < target:
        return "Not bad, could be better, almost reach your goals.";
      case average >= target:
        return "You are the best, keep going";
      default:
        return "Could not calculate average.";
    }
  };
  const targetAmount = {
    periodLength: exercises.length,
    trainingDays: trainingsDays.length,
    success: average >= target,
    rating: 2,
    ratingDescription: rating(),
    target: target,
    average: average,
  };
  return targetAmount;
};
try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateExercises(3, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]));
