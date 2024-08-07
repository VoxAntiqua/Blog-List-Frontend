import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const BlogDetails = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikeButton = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked!`, 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be updated', 5))
      console.error(exception)
    }
  }

  const handleRemoveButton = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`${blog.title} deleted`, 5))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('Blog could not be deleted', 5))
        console.error(exception)
      }
    }
  }

  return (
    <div>
      <h2>
        <b>
          {blog.title} {blog.author}
        </b>
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={handleLikeButton} className="like-button">
          like
        </button>
      </div>
      <div>
        added by {blog.user.name}{' '}
        <button
          onClick={handleRemoveButton}
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

/* const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikeButton = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked!`, 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be updated', 5))
      console.error(exception)
    }
  }

  const handleRemoveButton = () => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`${blog.title} deleted`, 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be deleted', 5))
      console.error(exception)
    }
  }

  if (blog) {
    return (
      <div>
        <div className="blog-url">{blog.url}</div>
        <div>
          likes <span className="like-count">{blog.likes}</span>{' '}
          <button onClick={handleLikeButton} className="like-button">
            like
          </button>
        </div>
        <div className="blog-user">{blog.user.name}</div>
        <button
          onClick={handleRemoveButton}
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
    )
  }
} */

export default BlogDetails
