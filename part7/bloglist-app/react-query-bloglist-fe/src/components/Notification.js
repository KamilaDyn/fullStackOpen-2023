import { useNotificationValue } from '../context/NotificationContext'
import { Alert } from 'react-bootstrap'

function Notification() {
  const notification = useNotificationValue()
  if (notification === null) {
    return null
  }
  return (
    <Alert variant={notification.type === 'error' ? 'danger' : 'success'}>
      {notification.text}
    </Alert>
  )
}

export default Notification
