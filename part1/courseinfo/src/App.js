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
      {parts.map((item) => (
        <Part key={item.name} name={item.name} exercises={item.exercises} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  return <p>Number of exercises {parts[0] + parts[1] + parts[2]}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const countParts = course.parts.map((item) => item["exercises"]);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={countParts} />
    </div>
  );
};

export default App;
