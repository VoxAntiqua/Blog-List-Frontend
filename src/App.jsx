import { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout, initializeUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { loadUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogout = event => {
    event.preventDefault
    dispatch(userLogout())
  }

  const Blogs = () => (
    <>
      <Togglable showLabel="create new" hideLabel="cancel">
        <Create />
      </Togglable>
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  const LoggedInView = () => {
    const match = useMatch('/users/:id')
    const userInfo = match ? users.find(u => u.id === match.params.id) : null

    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        </Routes>
      </div>
    )
  }

  const LoggedOutView = () => (
    <div>
      <h2>log in to application</h2>
      <Login />
    </div>
  )

  return (
    <div>
      <Notification />
      {user === null ? <LoggedOutView /> : <LoggedInView />}
    </div>
  )
}

export default App
