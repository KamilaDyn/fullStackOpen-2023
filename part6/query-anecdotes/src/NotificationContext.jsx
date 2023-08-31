import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "VOTED_ANECDOTE":
      return action.payload;
    case "CREATE_ANECDOTE":
      return action.payload;
    case "HIDE_ERROR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch[1];
};

export const useNotification = () => {
  const dispatch = useNotificationDispatch();
  const setNotification = (type, payload, duration) => {
    dispatch({ type, payload });
    setTimeout(() => {
      dispatch({ type: "HIDE_ERROR" });
    }, duration * 1000);
  };
  return setNotification;
};
