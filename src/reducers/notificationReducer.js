import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    loadNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    },
  },
})

export const { loadNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch(loadNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
