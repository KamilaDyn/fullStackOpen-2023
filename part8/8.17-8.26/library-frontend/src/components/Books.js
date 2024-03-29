import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";
import { useCallback, useEffect, useState } from "react";

const Books = ({ show, allGenresBook, page }) => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");
  const { data: loggedUser } = useQuery(LOGGED_USER, {
    fetchPolicy: "cache-and-network",
  });
  useEffect(() => {
    const useFavoriteGerne = loggedUser && loggedUser?.me?.favoriteGenre;
    if (page === "recommend" && useFavoriteGerne) {
      setGenre(useFavoriteGerne);
    }
    if (page === "books") {
      setGenre("");
    }
  }, [page, loggedUser]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  const getAllBooks = useCallback(() => {
    const books = (result.data && result.data.allBooks) || [];
    setBooks(books);
  }, [result.data]);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>{page === "books" ? "books" : "recommendations"}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {page === "books" && !!allGenresBook.length && (
        <>
          {" "}
          <button onClick={() => setGenre("")}>ALL</button>
          {allGenresBook.map(
            (genre) =>
              genre && (
                <button key={genre} onClick={() => setGenre(genre)}>
                  {genre}
                </button>
              )
          )}
        </>
      )}
    </div>
  );
};

export default Books;
