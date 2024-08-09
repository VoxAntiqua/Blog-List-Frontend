import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'
import {
  Header,
  Form,
  FormField,
  Button,
  List,
  Divider,
  ListItem,
} from 'semantic-ui-react'
import { setNotification } from '../reducers/notificationReducer'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleCommentSubmit = event => {
    event.preventDefault()
    dispatch(commentOnBlog(blog.id, comment))
    dispatch(setNotification(`new comment ${comment} added`, 'positive', 5))
    setComment('')
  }

  return (
    <div>
      <Divider />
      <Header>comments</Header>

      {blog.comments.length !== 0 ? (
        <List bulleted>
          {blog.comments.map(comment => (
            <ListItem key={comment._id}>{comment.content}</ListItem>
          ))}
        </List>
      ) : (
        <div>there are no comments yet</div>
      )}
      <Form onSubmit={handleCommentSubmit}>
        <FormField>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add your comment here"
          />
        </FormField>
        <Button type="submit">submit</Button>
      </Form>
    </div>
  )
}

export default Comments
