import { useEffect } from "react";
import AnecDoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./services/anecdotes";
import { setAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then((anecdotes) => dispatch(setAnecdote(anecdotes)));
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecDoteForm />
    </div>
  );
};

export default App;
