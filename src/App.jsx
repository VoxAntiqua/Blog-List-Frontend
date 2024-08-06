import { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, userLogout, initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = event => {
    event.preventDefault
    dispatch(userLogout())
  }

  const LoggedInView = () => (
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
  )

  const LoggedOutView = () => (
    <div>
      <h2>log in to application</h2>
      <Login />
    </div>
  )

  return (
    <>
      <Notification />
      {user === null ? <LoggedOutView /> : <LoggedInView />}
    </>
  )
}

export default App
