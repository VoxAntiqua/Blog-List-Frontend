import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useNotification from '../hooks/useNotification'
import { useState } from 'react'

const Create = () => {
  const { setNotification } = useNotification()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMutation = useMutation({
    mutationFn: async newBlog => {
      const result = await blogService.create(newBlog)
      return result
    },
    onSuccess: newBlog => {
      setNotification(`New blog ${newBlog.title} by ${newBlog.author} added`, 5)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: error => {
      setNotification('Blog could not be added', 5)
      console.error('Error in mutation:', error)
    },
  })

  const handleSubmit = event => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
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
