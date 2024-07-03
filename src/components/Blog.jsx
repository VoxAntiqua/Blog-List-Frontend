import { useState } from 'react'
import blogService from '../services/blogs'

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
      setBlogs(updatedBlogs)
      showNotification(`${blog.title} liked!`)
    } catch (exception) {
      showNotification('Blog could not be updated')
      console.error(exception)
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
      </div>
    </div>
  )
}

export default Blog
