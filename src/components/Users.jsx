import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Header,
  Table,
  TableRow,
  TableHeader,
  TableHeaderCell,
  TableCell,
  TableBody,
} from 'semantic-ui-react'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Header>users</Header>
      <Table basic="very" celled collapsing>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>&nbsp;</TableHeaderCell>
            <TableHeaderCell>blogs created</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
