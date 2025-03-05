import { CollectionConfig } from 'payload'
import { adminAndUser } from '../access/adminAndUser'
import { isAdmin } from '../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
    },
  },
  access: {
    read: adminAndUser,
    create: () => true,
    update: adminAndUser,
    delete: isAdmin,
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
    defaultColumns: ['id'],
    useAsTitle: 'firstName',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'roles',
      defaultValue: 'user',
      required: true,
      hasMany: true,
      saveToJWT: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Author', value: 'author' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'post',
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: ({ roles }) => roles && !roles.includes('admin'),
      },
    },
    {
      name: 'profile',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  timestamps: true,
}
