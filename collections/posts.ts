import { CollectionConfig } from 'payload'
import { isAdminOrAuthor } from '../access/adminAndAuthor'
import { isAdmin } from '../access/isAdmin'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: isAdminOrAuthor,
    update: isAdminOrAuthor,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: "Duration",
      type: "number",
      required: true
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'blog',
      options: [
        { label: 'blog', value: 'blog' },
        { label: 'article', value: 'article' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'published', value: 'published' },
        { label: 'draft', value: 'draft' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'category',
      hasMany: true,
      admin: {
        allowCreate: true,
      },
      required: true,
    },
    {
      name: 'cover',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      required: true,
      admin: {
        allowCreate: true,
      },
    },
  ],
}
