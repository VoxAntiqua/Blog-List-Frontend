import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = ({ blog }) => {
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

export default BlogDetails
