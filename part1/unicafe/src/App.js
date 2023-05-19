import { useState } from "react";

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistic = ({ statistic }) => {
  return (
    <table>
      <tbody>
        {statistic.map((item) => (
          <StatisticLine key={item.name} text={item.name} value={item.state} />
        ))}
      </tbody>
    </table>
  );
};

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allFeedback = good + neutral + bad;
  const averageFeedback = (good - bad) / allFeedback;
  const positiveFeedback = (good / allFeedback) * 100;
  const course = {
    title: "give feedback",
    feedback: [
      { name: "good", state: good },
      { name: "neutral", state: neutral },
      { name: "bad", state: bad },
      { name: "all", state: allFeedback },
      { name: "average", state: averageFeedback },
      { name: "positive", state: `${positiveFeedback}%` },
    ],
    statistic: "statistic",
  };

  const buttons = [
    { name: "good", handleFunction: () => setGood(good + 1) },
    { name: "neutral", handleFunction: () => setNeutral(neutral + 1) },
    { name: "bad", handleFunction: () => setBad(bad + 1) },
  ];

  return (
    <div>
      <Header title={course.title} />
      {buttons.map((button) => (
        <Button
          key={button.name}
          name={button.name}
          handleClick={button.handleFunction}
        />
      ))}
      <Header title={course.statistic} />
      {allFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistic statistic={course.feedback} />
      )}
    </div>
  );
};

export default App;
