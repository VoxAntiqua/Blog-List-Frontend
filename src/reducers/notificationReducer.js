import { createSlice } from '@reduxjs/toolkit'

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
    dispatch(loadNotification({ message, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
