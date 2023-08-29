import { configureStore } from "@reduxjs/toolkit";
import anecdotReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
  reducer: {
    anecdote: anecdotReducer,
    filter: filterReducer,
  },
});
