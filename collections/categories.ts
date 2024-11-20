import { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access/isLoggedIn'


export const Categories: CollectionConfig = {
  slug: 'category',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
