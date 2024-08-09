import { Header, HeaderSubheader, List, ListItem } from 'semantic-ui-react'

const User = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }

  return (
    <>
      <Header>{userInfo.name}</Header>
      <HeaderSubheader>added blogs</HeaderSubheader>
      <List bulleted>
        {userInfo.blogs.map(blog => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </>
  )
}

export default User
