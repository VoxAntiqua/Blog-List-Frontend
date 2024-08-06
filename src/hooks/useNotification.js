import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const useNotification = () => {
  const { dispatch } = useContext(NotificationContext)

  const setNotification = (message, timeout = 5) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: message,
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeout * 1000)
  }

  return { setNotification }
}

export default useNotification
