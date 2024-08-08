import { useEffect } from 'react'
import NavBar from './components/NavBar'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import { loadUsers } from './reducers/usersReducer'
import { Segment, Container } from 'semantic-ui-react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const LoggedInView = () => {
    const userMatch = useMatch('/users/:id')
    const userInfo = userMatch
      ? users.find(u => u.id === userMatch.params.id)
      : null

    const blogMatch = useMatch('/blogs/:id')
    const blogInfo = blogMatch
      ? blogs.find(b => b.id === blogMatch.params.id)
      : null

    return (
      <Container style={{ marginTop: '20px' }}>
        <Notification />
        <NavBar />
        <Segment attached stacked>
          <Routes>
            <Route path="/" element={<Blogs blogs={sortedBlogs} />} />
            <Route path="/blogs" element={<Blogs blogs={sortedBlogs} />} />
            <Route
              path="/blogs/:id"
              element={<BlogDetails blog={blogInfo} />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User userInfo={userInfo} />} />
          </Routes>
        </Segment>
      </Container>
    )
  }

  const LoggedOutView = () => (
    <div>
      <Notification />
      <Login />
    </div>
  )

  return <div>{user === null ? <LoggedOutView /> : <LoggedInView />}</div>
}

export default App
