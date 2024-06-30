import { useState } from 'react'
import blogService from '../services/blogs'

const Create = ({ blogs, setBlogs, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs([...blogs, newBlog])
      showNotification(`new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      showNotification('Blog could not be added')
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Create
