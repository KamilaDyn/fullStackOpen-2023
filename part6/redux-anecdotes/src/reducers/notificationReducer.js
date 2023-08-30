import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return null;
    },
  },
});

export const { newNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (content, duration) => {
  return (dispatch) => {
    dispatch(newNotification(content));
    setTimeout(() => {
      dispatch(hideNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
