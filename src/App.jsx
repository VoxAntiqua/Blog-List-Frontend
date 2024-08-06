import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import useNotification from './hooks/useNotification'
import UserContext from './contexts/UserContext'

const App = () => {
  const { user, dispatch: userDispatch } = useContext(UserContext)
  const { setNotification } = useNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET_USER',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  const handleLogout = event => {
    event.preventDefault
    window.localStorage.removeItem('loggedBloglistUser')
    userDispatch({
      type: 'LOGOUT',
    })
    setNotification('Logged out', 5)
  }

  return (
    <>
      <Notification />
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Login />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable showLabel="create new" hideLabel="cancel">
            <Create />
          </Togglable>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
