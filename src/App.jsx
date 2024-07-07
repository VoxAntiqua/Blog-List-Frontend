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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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

  const handleLikeButton = async blog => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      showNotification(`${blog.title} liked!`)
    } catch (exception) {
      showNotification('Blog could not be updated')
      console.error(exception)
    }
  }

  const handleRemoveButton = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
        showNotification(`${blog.title} deleted`)
      } catch (exception) {
        showNotification('Blog could not be deleted')
        console.error(exception)
      }
    }
  }

  const handleCreate = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      showNotification(`new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      showNotification('Blog could not be added')
    }
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
            <Create handleCreate={handleCreate} />
          </Togglable>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeButton={handleLikeButton}
              handleRemoveButton={handleRemoveButton}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App
