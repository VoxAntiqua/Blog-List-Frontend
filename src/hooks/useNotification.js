import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const useNotification = () => {
  const { dispatch: notificationDispatch } = useContext(NotificationContext)

  const setNotification = (message, timeout = 5) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    })

    setTimeout(() => {
      notificationDispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeout * 1000)
  }

  return { setNotification }
}

export default useNotification
