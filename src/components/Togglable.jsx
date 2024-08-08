import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const Togglable = props => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible && (
        <Button onClick={toggleVisibility}>{props.showLabel}</Button>
      )}
      {visible && (
        <div>{React.cloneElement(props.children, { toggleVisibility })}</div>
      )}
    </div>
  )
}

export default Togglable
