import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification) {
    return <Message>{notification}</Message>
  }
}

export default Notification
