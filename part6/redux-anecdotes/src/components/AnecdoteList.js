import { useSelector, useDispatch } from "react-redux";
import { voteAnecDote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  newNotification,
} from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const setNotification = (title) => {
    dispatch(newNotification(`You voted: ${title}`));
    setTimeout(() => {
      dispatch(hideNotification(""));
    }, 5000);
  };
  const vote = (anecdote) => {
    dispatch(voteAnecDote(anecdote.id));
    setNotification(anecdote.content);
  };
  const filteredMap = filters.length
    ? anecdotes.filter((item) => item.content.includes(filters))
    : anecdotes;
  return filteredMap.map((anecdote) => (
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
