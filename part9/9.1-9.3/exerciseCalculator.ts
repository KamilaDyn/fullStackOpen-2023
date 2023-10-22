interface Target {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (exercises: number[], target: number): Target => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));
