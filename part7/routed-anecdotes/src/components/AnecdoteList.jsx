import { Link } from "react-router-dom";
const padding = {
  paddingBottom: 5,
};

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification && <p style={padding}>{notification}</p>}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
