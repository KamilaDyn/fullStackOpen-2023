import { useNotificationValue } from '../context/NotificationContext'

function Notification() {
  const notification = useNotificationValue()
  if (notification === null) {
    return null
  }
  return (
    <div id="notification" className={notification.type}>
      {notification.text}
    </div>
  )
}

export default Notification
