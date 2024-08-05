import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

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

  const handleLikeButton = blog => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked!`, 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be updated', 5))
      console.error(exception)
    }
  }

  const handleRemoveButton = blog => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`${blog.title} deleted`, 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be deleted', 5))
      console.error(exception)
    }
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
}

export default Blog
