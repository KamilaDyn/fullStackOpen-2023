import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Login from "./components/Login";
import { ALL_BOOKS } from "./queries";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [allGenresBook, setAllGenresBook] = useState([]);
  const client = useApolloClient();

  const result = useQuery(ALL_BOOKS);

  const notify = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  useEffect(() => {
    const genresBook =
      result.data && result.data.allBooks.map((book) => book.genres).flat();
    const genres = [...new Set(genresBook)];
    if (genres.length) {
      setAllGenresBook(genres);
    }
  }, [result.data]);
  useEffect(() => {
    const localToken = window.localStorage.getItem("user-data-book-app");
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  if (!token) {
    return (
      <>
        <Notify errorMessage={error} />
        <Login show={page === "login"} setError={notify} setToken={setToken} />
      </>
    );
  }
  const logOut = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
          </>
        )}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logOut}>Logout</button>
        )}
      </div>
      {error && <Notify errorMessage={error} />}
      <Authors show={page === "authors"} setError={notify} token={token} />

      <Books
        show={page === "books" || page === "recommend"}
        allGenresBook={allGenresBook}
        page={page}
      />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
