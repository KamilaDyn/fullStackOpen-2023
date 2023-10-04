import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_USER } from "../queries";
import { useEffect, useState } from "react";

const Books = ({ show, allGenresBook, page }) => {
  const [genre, setGenre] = useState("");
  const { data: loggedUser } = useQuery(LOGGED_USER);
  useEffect(() => {
    const useFavoriteGerne = loggedUser.me.favoriteGenre;
    if (page === "recommend") {
      setGenre(useFavoriteGerne);
    } else {
      setGenre("");
    }
  }, [genre, page]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!show) {
    return null;
  }

  const books = (result.data && result.data.allBooks) || [];
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
          <button onClick={() => setGenre(null)}>ALL</button>
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
