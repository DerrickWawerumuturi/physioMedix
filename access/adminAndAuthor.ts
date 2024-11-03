import { Access } from 'payload'
import { User } from 'payload-types'

export const isAdminOrAuthor: Access<User> = ({ req: { user } }) => {
  if (user) {
    if (user.roles.includes('admin')) return true

    if (user.roles.includes('author') && user?.post && user.post?.length > 0) {
      return {
        or: [
          {
            post: {
              in: user.post,
            },
          },
          {
            post: {
              exists: false,
            },
          },
        ],
      }
    }
  }

  return {
    or: [
      {
        status: {
          equals: 'published',
        },
      },
    ],
  }
}
