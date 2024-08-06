import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification) {
    return <div className="notification">{notification}</div>
  }
}

export default Notification
