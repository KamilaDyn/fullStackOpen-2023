function Notification() {
  const notification = null
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
