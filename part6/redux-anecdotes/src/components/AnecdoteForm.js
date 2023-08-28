import { useDispatch } from "react-redux";
import { createAnecDote } from "../reducers/anecdoteReducer";

const AnecDoteForm = () => {
  const dispatch = useDispatch();
  const addAnecDotes = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecDote(content));
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
