import { useState } from "react";

const Container = ({ title, content, vote }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        has {vote} {vote <= 1 ? "vote" : "votes"}{" "}
      </p>
    </div>
  );
};

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, vote] = useState(Array(anecdotes.length).fill(0));
  let copy = [...points];
  copy[selected] += 1;
  const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
  const anecdoteWithMaxVotes = points.indexOf(Math.max(...points));

  return (
    <div>
      <Container
        title="Anecdote of the day"
        content={anecdotes[selected]}
        vote={points[selected]}
      />
      <div>
        <Button name="vote" handleClick={() => vote(copy)} />
        <Button
          name="next anecdote"
          handleClick={() => setSelected(randomAnecdote)}
        />
      </div>
      <Container
        title="Anecdote with most votes"
        content={anecdotes[anecdoteWithMaxVotes]}
        vote={points[anecdoteWithMaxVotes]}
      />
    </div>
  );
};

export default App;
