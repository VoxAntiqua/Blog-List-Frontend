import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload
      const blogToChange = state.find(b => b.id === id)
      if (blogToChange) {
        blogToChange.likes += 1
      }
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    toggleDetails(state, action) {
      const id = action.payload
      const blogToToggle = state.find(b => b.id === id)
      if (blogToToggle) {
        blogToToggle.showDetails = !blogToToggle.showDetails
      }
    },
  },
})

export const { addLike, setBlogs, appendBlog, removeBlog, toggleDetails } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const initialBlogs = await blogService.getAll()
    const blogsWithShowDetails = initialBlogs.map(blog => ({
      ...blog,
      showDetails: false,
    }))
    dispatch(setBlogs(blogsWithShowDetails))
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    newBlog.user = user
    newBlog.showDetails = false
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, changedBlog)
    dispatch(addLike(blog.id))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
  }
}

export default blogSlice.reducer
