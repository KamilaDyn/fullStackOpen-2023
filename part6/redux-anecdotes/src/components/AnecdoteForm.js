import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";

const AnecDoteForm = () => {
  const dispatch = useDispatch();

  const addAnecDotes = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`new anecdote '${content}'`, 5));
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
