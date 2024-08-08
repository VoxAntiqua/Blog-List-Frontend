import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { userLogout } from '../reducers/userReducer'
import { Menu, Button, MenuMenu, MenuItem, Header } from 'semantic-ui-react'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    const currentPath = location.pathname
    if (currentPath === '/' || currentPath.startsWith('/blogs')) {
      setActiveItem('blogs')
    } else if (currentPath.startsWith('/users')) {
      setActiveItem('users')
    } else {
      setActiveItem('')
    }
  }, [location.pathname])

  const handleLogout = event => {
    event.preventDefault
    dispatch(userLogout())
  }

  return (
    <Menu pointing attached="top">
      <MenuItem>
        <Header color="blue">blog app</Header>
      </MenuItem>
      <MenuItem
        name="blogs"
        active={activeItem === 'blogs'}
        onClick={() => {
          setActiveItem('blogs')
          navigate('/')
        }}
      />
      <MenuItem
        name="users"
        active={activeItem === 'users'}
        onClick={() => {
          setActiveItem('users')
          navigate('/users')
        }}
      />

      <MenuMenu position="right">
        <MenuItem>logged in as {user.name}</MenuItem>
        <MenuItem>
          <Button name="logout" onClick={handleLogout} color="vk">
            logout
          </Button>
        </MenuItem>
      </MenuMenu>
    </Menu>
  )
}

export default NavBar
