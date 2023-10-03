import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const notify = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={error} />
        <Login show={page === "login"} setError={notify} setToken={setToken} />
      </>
    );
  }
  const logOut = () => {
    window.localStorage.removeItem("user-data-book-app");
    setToken(null);
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logOut}>Logout</button>
        )}
      </div>
      {error && <Notify errorMessage={error} />}
      <Authors show={page === "authors"} setError={notify} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
