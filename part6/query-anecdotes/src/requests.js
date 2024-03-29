import axios from "axios";

const urlBase = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(urlBase);
  return response.data;
};

export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(urlBase, newAnecdote);
  return response.data;
};

export const updateAnecdote = async (updateVote) => {
  const response = await axios.put(`${urlBase}/${updateVote.id}`, updateVote);
  return response.data;
};
