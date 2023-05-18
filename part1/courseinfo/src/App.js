const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
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
