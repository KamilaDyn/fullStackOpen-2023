function Notification({ notification, setNotification }) {
  if (notification === null) {
    return null;
  }
  return (
    <div className={notification.type} onClick={() => setNotification(null)}>
      {notification.text}
    </div>
  );
}

export default Notification;
