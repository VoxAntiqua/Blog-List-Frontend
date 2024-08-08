import Togglable from './Togglable'
import Create from './Create'
import { List, ListItem, ListHeader, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => (
  <>
    <Header>blogs</Header>
    <List divided verticalAlign="middle">
      {blogs.map(blog => (
        <ListItem key={blog.id}>
          <ListHeader>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListHeader>
          {blog.author}
        </ListItem>
      ))}
    </List>
    <Togglable showLabel="create new" hideLabel="cancel">
      <Create />
    </Togglable>
  </>
)

export default Blogs
