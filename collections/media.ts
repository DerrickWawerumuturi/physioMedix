import { CollectionConfig } from 'payload'
import { isAdminorHasAccessToImages } from '../access/isAdminOrHasAccessToImages'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdminorHasAccessToImages(),
    update: isAdminorHasAccessToImages(),
    delete: isAdminorHasAccessToImages(),
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'center',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'center',
      },
    ],
    mimeTypes: ['image/*'],
    adminThumbnail: (doc) => {
      return `/media/${doc.doc.filename}`
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const updatedDoc = {
            ...doc,
            url: `/media/${doc.filename}`,
          }
          return updatedDoc
        }
        return doc
      },
    ],
  },
}
