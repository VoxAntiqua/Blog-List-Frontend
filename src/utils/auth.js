import blogService from '../services/blogs'
import loginService from '../services/login'

export const handleLogin = async credentials => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
  blogService.setToken(user.token)
  return user
}

export const handleLogout = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  blogService.setToken(null)
}

export const getLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}
