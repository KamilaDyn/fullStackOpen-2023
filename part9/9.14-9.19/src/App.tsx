import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import courseParts from "./coursePartsData";

function App() {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map((part) => (
        <Content key={part.name} part={part} />
      ))}
      <Total total={totalExercises} />
    </div>
  );
}

export default App;
