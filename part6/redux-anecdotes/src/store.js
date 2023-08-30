import { configureStore } from "@reduxjs/toolkit";
import anecdotReducer, {
  appendAnecdote,
  setAnecdote,
} from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import { getAll } from "./services/anecdotes";

export const store = configureStore({
  reducer: {
    anecdote: anecdotReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

getAll().then((anecdotes) => store.dispatch(setAnecdote(anecdotes)));
