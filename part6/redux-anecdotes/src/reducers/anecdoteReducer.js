import { createSlice } from "@reduxjs/toolkit";

import { getId } from "../utils";
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content: content,
        id: getId(),
        votes: 0,
      });
    },
    voteAnecDote(state, action) {
      const id = action.payload;
      const updateVote = state.find((n) => n.id === id);
      const changeAnecDote = {
        ...updateVote,
        votes: updateVote.votes + 1,
      };
      return state
        .map((item) => (item.id !== id ? item : changeAnecDote))
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { createAnecdote, voteAnecDote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
