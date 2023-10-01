import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  console.log(error);
  const notify = (message) => {
    console.log(message);
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      {error && <Notify errorMessage={error} />}
      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
