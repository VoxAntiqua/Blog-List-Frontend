import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification.message) {
    return (
      <div style={{ height: '40px' }}>
        {' '}
        {/* Ensure consistent height */}
        <Message
          positive={notification.type === 'positive'}
          negative={notification.type === 'negative'}
        >
          {notification.message}
        </Message>
      </div>
    )
  }
  return <div style={{ height: '40px' }}></div> // Reserve the same space even if no message
}

export default Notification
