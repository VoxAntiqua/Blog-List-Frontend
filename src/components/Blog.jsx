import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import BlogDetails from './BlogDetails'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetails = event => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span> {blog.author}{' '}
      <button onClick={toggleDetails} className="toggle-details">
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && <BlogDetails blog={blog} />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
