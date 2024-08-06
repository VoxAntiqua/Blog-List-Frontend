import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  if (notification === null) {
    return null
  }
  return <div className="notification">{notification}</div>
}

export default Notification
