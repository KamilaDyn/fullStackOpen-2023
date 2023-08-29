import { useSelector, useDispatch } from "react-redux";
import { voteAnecDote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecDote(id));
  };
  const filteredMap = filters.length
    ? anecdotes.filter((item) => item.content.includes(filters))
    : anecdotes;
  return filteredMap.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
