import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useField = (addNew) => {
  const [anecdote, setAnecdote] = useState({
    content: "",
    author: "",
    info: "",
  });
  const { content, author, info } = anecdote;
  const navigate = useNavigate();
  const onChange = (event) => {
    const { value, name } = event.target;
    setAnecdote((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content,
      author,
      info,
      votes: 0,
    });
    navigate("/");
  };

  const cleanForm = () => {
    setAnecdote({
      content: "",
      author: "",
      info: "",
    });
  };
  return {
    handleSubmit,
    onChange,
    anecdote,
    cleanForm,
  };
};

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
};
