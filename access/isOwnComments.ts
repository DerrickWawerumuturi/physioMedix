import { Access } from 'payload'

export const yourOwnCommentsOrCategory: Access = ({ req: { user } }) => {
  if (user?.roles.includes('admin')) return true

  return {
    user: {
      equals: user?.id,
    },
  }
}
