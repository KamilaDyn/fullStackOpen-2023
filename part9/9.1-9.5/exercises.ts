interface Target {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, exercises: number[]): Target => {
  const trainingsDays = exercises.filter((number) => number > 0);
  const average =
    exercises.reduce((acc, curr) => acc + curr, 0) / exercises.length;

  const rating = () => {
    switch (true) {
      case average < target / 2:
        return "bad";
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

export { calculateExercises };
