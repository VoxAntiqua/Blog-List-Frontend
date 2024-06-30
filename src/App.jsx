import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = event => {
    event.preventDefault
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    showNotification('Logged out')
  }

  return (
    <>
      <Notification message={message} />
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Login setUser={setUser} showNotification={showNotification} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable showLabel="create new" hideLabel="cancel">
            <Create
              blogs={blogs}
              setBlogs={setBlogs}
              showNotification={showNotification}
            />
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
