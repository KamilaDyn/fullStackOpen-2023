import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  newNotification,
} from "../reducers/notificationReducer";
import { createNew } from "../services/anecdotes";

const AnecDoteForm = () => {
  const dispatch = useDispatch();

  const setNotification = (content) => {
    dispatch(newNotification(`You added new anecdote: ${content}`));
    setTimeout(() => {
      dispatch(hideNotification(""));
    }, 5000);
  };
  const addAnecDotes = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecDote = await createNew(content);
    dispatch(createAnecdote(newAnecDote));
    setNotification(content);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecDotes}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecDoteForm;
