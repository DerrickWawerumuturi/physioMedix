import { Access } from 'payload'
import { User } from 'payload-types'

export const isAdminorHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User

    if (!user) return false
    if (user.roles.includes('admin')) return true

    return {
      user: {
        equals: user.id,
      },
    }
  }
