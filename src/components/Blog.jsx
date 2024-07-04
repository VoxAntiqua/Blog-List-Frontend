import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, showNotification, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDetailsButton = event => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  const handleLikeButton = async blog => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      showNotification(`${blog.title} liked!`)
    } catch (exception) {
      showNotification('Blog could not be updated')
      console.error(exception)
    }
  }

  const handleRemoveButton = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
        showNotification(`${blog.title} deleted`)
      } catch (exception) {
        showNotification('Blog could not be deleted')
        console.error(exception)
      }
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={handleDetailsButton}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handleLikeButton(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button
          onClick={() => handleRemoveButton(blog)}
          style={{
            display:
              JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
                .username === blog.user.username
                ? ''
                : 'none',
          }}
        >
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
