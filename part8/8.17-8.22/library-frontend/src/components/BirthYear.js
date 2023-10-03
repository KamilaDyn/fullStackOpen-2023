import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BIRTHDAY_YEAR, All_AUTHORS } from "../queries";

const BirthYear = ({ setError, authors }) => {
  const [name, setName] = useState((authors.length && authors[0].name) || "");
  const [born, setBornYear] = useState("");
  const [changeBirthYear] = useMutation(BIRTHDAY_YEAR, {
    refetchQueries: [{ query: All_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((err) => err.message).join("\n");
      setError(message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    changeBirthYear({ variables: { name, born } });
  };
  return (
    <div>
      <h2>Set birthday</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label id="name">name</label>
          <select
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>born</label>

          <input
            type="text"
            name="born"
            value={born}
            onChange={(e) => setBornYear(Number(e.target.value))}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
