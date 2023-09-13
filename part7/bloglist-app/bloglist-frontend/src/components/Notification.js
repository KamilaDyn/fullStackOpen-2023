import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducers'

function Notification() {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  console.log(notification)
  if (notification === null) {
    return null
  }
  return (
    <div
      id="notification"
      className={notification.type}
      onClick={() => dispatch(setNotification(null))}
    >
      {notification.text}
    </div>
  )
}

export default Notification
