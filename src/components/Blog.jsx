import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useNotification from '../hooks/useNotification'
import blogService from '../services/blogs'

const Blog = ({ blog, handleRemoveButton }) => {
  const [showDetails, setShowDetails] = useState(false)
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification(`${blog.title} liked!`, 5)
    },
    onError: () => {
      setNotification('blog could not be updated', 5)
    },
  })

  const addVote = blog => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDetailsButton = event => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span> {blog.author}{' '}
      <button onClick={handleDetailsButton} className="toggle-details">
        {showDetails ? 'hide' : 'view'}
      </button>
      <div
        className="blog-details"
        style={{ display: showDetails ? '' : 'none' }}
      >
        <div className="blog-url">{blog.url}</div>
        <div>
          likes <span className="like-count">{blog.likes}</span>{' '}
          <button onClick={() => addVote(blog)} className="like-button">
            like
          </button>
        </div>
        <div className="blog-user">{blog.user.name}</div>
        <button
          onClick={() => handleRemoveButton(blog)}
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

export default Blog
