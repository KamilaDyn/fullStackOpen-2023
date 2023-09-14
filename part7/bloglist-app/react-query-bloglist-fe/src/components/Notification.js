import { useNotificationValue } from '../context/NotificationContext'

function Notification() {
  const notification = useNotificationValue()
  console.log(notification)
  if (notification === null) {
    return null
  }
  return (
    <div
      id="notification"
      className={notification.type}
      onClick={() => console.log('ok')}
    >
      {notification.text}
    </div>
  )
}

export default Notification
