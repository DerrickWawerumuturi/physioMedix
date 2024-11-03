import { Access } from 'payload'
import { User } from 'payload-types'

export const adminAndUser: Access<User> = ({ req: { user } }) => {
  if (user) {
    if (user.roles.includes('admin')) return true

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
