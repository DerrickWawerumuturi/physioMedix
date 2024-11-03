import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { yourOwnCommentsOrCategory } from '../access/isOwnComments'

export const Comments: CollectionConfig = {
  slug: 'comments',
  access: {
    read: yourOwnCommentsOrCategory,
    create: yourOwnCommentsOrCategory,
    update: yourOwnCommentsOrCategory,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'comment',
  },
  fields: [
    {
      name: 'comment',
      type: 'text',
      required: true,
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {},
    },
  ],
}
