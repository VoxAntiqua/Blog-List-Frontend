import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeButton, handleRemoveButton }) => {
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

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span> {blog.author}{' '}
      <button onClick={handleDetailsButton} className="toggle-details">
        {showDetails ? 'hide' : 'view'}
      </button>
      <div
        className="blog-details"
        style={{ display: showDetails ? '' : 'none' }}
      >
        <div className="blog-url">{blog.url}</div>
        <div>
          likes <span className="like-count">{blog.likes}</span>{' '}
          <button
            onClick={() => handleLikeButton(blog)}
            className="like-button"
          >
            like
          </button>
        </div>
        <div className="blog-user">{blog.user.name}</div>
        <button
          onClick={() => handleRemoveButton(blog)}
          style={{
            display:
              JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
                .username === blog.user.username
                ? ''
                : 'none',
          }}
          className="remove-button"
        >
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeButton: PropTypes.func.isRequired,
  handleRemoveButton: PropTypes.func.isRequired,
}

export default Blog
