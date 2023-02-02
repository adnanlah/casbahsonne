import {UserType} from '../../types'
import User from '../User'
import {UsersWrapper} from './style'

type UsersProps = {
  users: UserType[]
}

function Users({users}: UsersProps) {
  return (
    <UsersWrapper>
      {users.map((user, idx) => (
        <User key={`${idx}-${user.id}`} user={user} />
      ))}
    </UsersWrapper>
  )
}

export default Users
