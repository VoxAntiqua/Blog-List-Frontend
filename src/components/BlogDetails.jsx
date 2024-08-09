import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Confirm } from 'semantic-ui-react'
import Comments from './Comments'
import { Header, Button } from 'semantic-ui-react'

const BlogDetails = ({ blog }) => {
  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleLikeButton = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} liked!`, 'positive', 5))
    } catch (exception) {
      dispatch(setNotification('Blog could not be updated', 'negative', 5))
      console.error(exception)
    }
  }

  const handleRemove = () => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`${blog.title} deleted`, 'positive', 5))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification('Blog could not be deleted', 'negative', 5))
      console.error(exception)
    }
  }

  return (
    <div>
      <Header>
        {blog.title} {blog.author}
      </Header>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>added by {blog.user.name} </div>
      <div>{blog.likes} likes </div>

      <div>
        <Button onClick={handleLikeButton} className="like-button">
          like
        </Button>
        {JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
          .username === blog.user.username ? (
          <Button
            onClick={() => {
              setConfirmOpen(true)
            }}
          >
            remove
          </Button>
        ) : (
          <Button disabled>remove</Button>
        )}

        <Confirm
          open={confirmOpen}
          content={`Are you sure you want to delete ${blog.title}?`}
          onCancel={() => {
            setConfirmOpen(false)
          }}
          onConfirm={() => {
            setConfirmOpen(false)
            handleRemove()
          }}
        />
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetails
