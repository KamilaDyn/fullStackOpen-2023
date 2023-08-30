import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const urlBase = "http://localhost:3001/anedotes";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const getAnecdotes = async () => {
    const response = await axios.get(urlBase);
    return response.data;
  };

  const { status, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });
  const anecdotes = data;
  if (status === "loading") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    return <h2> anecdote service not available due to problems in server</h2>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
