import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const loadUsers = () => {
  return async dispatch => {
    const loadedUsers = await userService.getAll()
    dispatch(setUsers(loadedUsers))
  }
}

export default usersSlice.reducer
