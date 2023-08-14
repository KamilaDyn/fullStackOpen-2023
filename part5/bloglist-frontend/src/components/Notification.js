import PropTypes from "prop-types";

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

Notification.propTypes = {
  notification: PropTypes.object,
  setNotification: PropTypes.func.isRequired,
};
export default Notification;
