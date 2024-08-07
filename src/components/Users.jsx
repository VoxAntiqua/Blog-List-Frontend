import userService from '../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
