import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAnecdote } from "../requests";
import { useNotification } from "../NotificationContext";

const AnecdoteForm = () => {
  const setNotification = useNotification();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      setNotification(
        "CREATE_ANECDOTE_ERROR",
        "An error occurred while creating the anecdote",
        5
      );
    },
  });
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    if (content.length < 5) {
      setNotification(
        "CREATE_ANECDOTE_ERROR",
        "To short anecode, must have length 5 or more",
        5
      );
    } else {
      newAnecdoteMutation.mutate({
        content: content,
        votes: 0,
      });
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
