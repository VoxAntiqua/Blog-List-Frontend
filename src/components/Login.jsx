import { useState, useContext } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import useNotification from '../hooks/useNotification'
import UserContext from '../contexts/UserContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setNotification } = useNotification()
  const { dispatch } = useContext(UserContext)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        payload: user,
      })
      setUsername('')
      setPassword('')
      setNotification(`Logged in as ${user.name}`, 5)
    } catch (exception) {
      setNotification('Wrong username or password', 5)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
