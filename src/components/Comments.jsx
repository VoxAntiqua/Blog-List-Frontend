import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleCommentSubmit = event => {
    event.preventDefault()
    dispatch(commentOnBlog(blog.id, comment))
    setComment('')
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.length !== 0 ? (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      ) : (
        <div>there are no comments yet</div>
      )}
    </div>
  )
}

export default Comments
