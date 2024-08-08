import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

const BlogDetails = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikeButton = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked!`, 'positive', 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be updated', 'negative', 5))
      console.error(exception)
    }
  }

  const handleRemoveButton = () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`${blog.title} deleted`, 'positive', 5))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('Blog could not be deleted', 'negative', 5))
        console.error(exception)
      }
    }
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
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
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetails
