import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Create = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

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
      dispatch(createBlog(content))
      dispatch(
        setNotification(
          `new blog ${content.title} by ${content.author} added`,
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Blog could not be added', 5))

      console.error(exception)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Create
