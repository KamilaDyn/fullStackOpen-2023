import { useQuery } from "@apollo/client";
import BirthYear from "./BirthYear";

import { All_AUTHORS } from "../queries";

const Authors = ({ show, setError }) => {
  const result = useQuery(All_AUTHORS);
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = (result.data && result.data.allAuthors) || [];
  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BirthYear setError={setError} authors={authors} />
    </>
  );
};

export default Authors;
