import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <div className={notification !== '' ? 'notification' : 'hidden'}>
      {notification}
    </div>
  )
}

export default Notification
