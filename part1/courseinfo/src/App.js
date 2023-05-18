const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
    </>
  );
};

const Total = ({ total }) => {
  return <p>Number of exercises {total[0] + total[1] + total[2]}</p>;
};

const App = () => {
  const course = {
    title: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  const exercisesTotal = course.parts.map((item) => item["exercises"]);

  return (
    <div>
      <Header course={course.title} />
      <Content parts={course.parts} />
      <Total total={exercisesTotal} />
    </div>
  );
};

export default App;
