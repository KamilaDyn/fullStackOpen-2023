import { useSelector, useDispatch } from "react-redux";
import { updateAnecdoteVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateAnecdoteVote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
  };
  const filteredMap = filters.length
    ? anecdotes?.filter((item) => item.content.includes(filters))
    : anecdotes;
  return filteredMap?.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
