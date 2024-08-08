import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const initialState = {
  message: '',
  type: '', // 'positive' or 'negative'
}

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

export const setNotification = (message, type, duration) => {
  return async dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(loadNotification({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
