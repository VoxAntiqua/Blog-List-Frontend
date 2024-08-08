import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Divider, Header, FormField, Form, Button } from 'semantic-ui-react'

const Create = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleSubmit = event => {
    event.preventDefault()
    const content = {
      title,
      author,
      url,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    try {
      dispatch(createBlog(content, user))
      dispatch(
        setNotification(
          `new blog ${content.title} by ${content.author} added`,
          'positive',
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Blog could not be added', 'negative', 5))
      console.error(exception)
    }
  }

  return (
    <>
      <Divider />
      <Header>create new</Header>
      <Form size="tiny" onSubmit={handleSubmit}>
        <FormField>
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormField>

        <FormField>
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormField>
        <Button type="submit">create</Button>
        <Button type="button" onClick={toggleVisibility}>
          cancel
        </Button>
      </Form>
    </>
  )
}

export default Create
