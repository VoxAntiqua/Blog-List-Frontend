import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

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

  const handleLikeButton = blog => {
    console.log('Liked:', blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={handleDetailsButton}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handleLikeButton(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
