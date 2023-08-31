import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createAnecdote } from "../requests";
import { useState } from "react";
import { useNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const [validate, setValidate] = useState("");
  const setNotification = useNotification();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length > 5) {
      event.target.anecdote.value = "";
      newAnecdoteMutation.mutate({ content: content, votes: 0 });
      setNotification("CREATE_ANECDOTE", `Added new ${content}`, 5);
      setValidate("");
    } else {
      setValidate("new content must be min 5 characters length");
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
        {!!validate.length && <p>{validate}</p>}
      </form>
    </div>
  );
};

export default AnecdoteForm;
