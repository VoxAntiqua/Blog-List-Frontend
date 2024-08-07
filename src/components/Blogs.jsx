import Togglable from './Togglable'
import Create from './Create'
import Blog from './Blog'

const Blogs = ({ blogs }) => (
  <>
    <Togglable showLabel="create new" hideLabel="cancel">
      <Create />
    </Togglable>
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </>
)

export default Blogs
