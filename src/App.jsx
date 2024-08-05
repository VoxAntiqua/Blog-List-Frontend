import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = event => {
    event.preventDefault
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    dispatch(setNotification('Logged out', 5))
  }

  return (
    <>
      <Notification />
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Login setUser={setUser} />
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
          {sortedBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
