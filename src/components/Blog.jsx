import { useState } from 'react'
import blogService from '../services/blogs'
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
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={handleDetailsButton}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div
        className="blogDetails"
        style={{ display: showDetails ? '' : 'none' }}
      >
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
  handleLikeButton: PropTypes.func.isRequired,
  handleRemoveButton: PropTypes.func.isRequired,
}

export default Blog
