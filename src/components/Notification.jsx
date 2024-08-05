import { useSelector } from 'react-redux'

/* const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="notification">{message}</div>
} */

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div className={notification !== '' ? 'notification' : 'hidden'}>
      {notification}
    </div>
  )
}

export default Notification
