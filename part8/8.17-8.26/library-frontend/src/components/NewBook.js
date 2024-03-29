import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ALL_BOOKS, CREATE_BOOK, All_AUTHORS } from "../queries";

const NewBook = ({ show, notifyInfo }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ALL_BOOKS, All_AUTHORS],
    onError: (error) => {
      const message = error.graphQLErrors.map((err) => err.message).join("\n");
      notifyInfo("error", message);
    },
    onCompleted: () => {
      notifyInfo("success", "Book added");
      setTitle("");
      setPublishedDate("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    },
  });
  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    const published = Number(publishedDate);
    createBook({ variables: { title, author, published, genres } });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={publishedDate}
            onChange={({ target }) => setPublishedDate(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
