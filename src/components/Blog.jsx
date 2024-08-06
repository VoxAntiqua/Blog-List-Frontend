import { useDispatch } from 'react-redux'
import { toggleDetails } from '../reducers/blogReducer'
import BlogDetails from './BlogDetails'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetailsHandler = () => {
    dispatch(toggleDetails(blog.id))
  }

  return (
    <div style={blogStyle} className="blog">
      <span className="blog-title">{blog.title}</span> {blog.author}{' '}
      <button onClick={toggleDetailsHandler} className="toggle-details">
        {blog.showDetails ? 'hide' : 'view'}
      </button>
      {blog.showDetails && <BlogDetails blog={blog} />}
    </div>
  )
}

export default Blog
