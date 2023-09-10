import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const { onChange, anecdote, handleSubmit, cleanForm } = useField(addNew);
  const { content, info, author } = anecdote;
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" value={content} onChange={onChange} />
        </div>
        <div>
          author
          <input name="author" value={author} onChange={onChange} />
        </div>
        <div>
          url for more info
          <input name="info" value={info} onChange={onChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={cleanForm} style={{ marginLeft: "5px" }}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
