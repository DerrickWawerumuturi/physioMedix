import { Access } from 'payload'
import { User } from 'payload-types'

export const isLoggedIn: Access<User> = ({ req: { user } }) => {
  return Boolean(user)
}
