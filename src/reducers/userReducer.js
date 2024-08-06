import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { handleLogin, handleLogout, getLoggedUser } from '../utils/auth'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await handleLogin({
        username,
        password,
      })
      dispatch(setUser(user))
      dispatch(setNotification(`Logged in as ${user.name}`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    handleLogout()
    dispatch(setUser(null))
    dispatch(setNotification('Logged out', 5))
  }
}

export const initializeUser = () => {
  return dispatch => {
    const user = getLoggedUser()
    if (user) {
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export default userSlice.reducer
