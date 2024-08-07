import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const padding = {
    padding: '5px',
    display: 'inline-block',
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = event => {
    event.preventDefault
    dispatch(userLogout())
  }

  return (
    <div style={{ background: 'LightGray' }}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <span style={padding}>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </span>
    </div>
  )
}

export default NavBar
