import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BIRTHDAY_YEAR, All_AUTHORS } from "../queries";

const BirthYear = ({ setError }) => {
  const [name, setName] = useState("");
  const [setBornTo, setBornYear] = useState("");
  const [changeBirthYear] = useMutation(BIRTHDAY_YEAR, {
    refetchQueries: [{ query: All_AUTHORS }],
    onError: (error) => {
      const message = error.graphQLErrors.map((err) => err.message).join("\n");
      setError(message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.length || setBornTo.length === 0) {
      setError("add name and born year");
    } else {
      changeBirthYear({ variables: { name, setBornTo } });
    }
  };

  return (
    <div>
      <h2>Set birthday</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          <label id="name">name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>born</label>
          <input
            type="text"
            name="setBornTo"
            value={setBornTo}
            onChange={(e) => setBornYear(Number(e.target.value))}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
