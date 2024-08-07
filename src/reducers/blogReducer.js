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
    addComment(state, action) {
      const { id, comment } = action.payload
      const blogToUpdate = state.find(b => b.id === id)
      if (blogToUpdate) {
        blogToUpdate.comments = blogToUpdate.comments.concat(comment)
      }
    },
  },
})

export const { addLike, setBlogs, appendBlog, removeBlog, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const initialBlogs = await blogService.getAll()

    dispatch(setBlogs(initialBlogs))
  }
}

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    newBlog.user = user
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

export const commentOnBlog = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch(
      addComment({
        id,
        comment: updatedBlog.comments[updatedBlog.comments.length - 1],
      })
    )
  }
}

export default blogSlice.reducer
