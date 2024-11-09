// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Posts } from './collections/posts'
import { Categories } from './collections/categories'
import { Comments } from 'collections/comments'
import { Media } from 'collections/media'
import { Users } from 'collections/users'
import nodemailer from 'nodemailer'
import { EmailAdapter } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server host
  port: parseInt(process.env.SMTP_PORT || '587', 10), // SMTP port, usually 587 or 465
  auth: {
    user: process.env.SMTP_USER, // SMTP user
    pass: process.env.SMTP_PASSWORD, // SMTP password
  },
  secure: false, // Set to true if using port 465, otherwise false for 587
})

const emailAdapter: EmailAdapter = ({ payload }) => ({
  name: 'PhysioMedix',
  defaultFromAddress: 'simonmuriukimars@gmail.com',
  defaultFromName: 'PhysioMedix',

  async sendEmail({ to, subject, html, text }) {
    try {
      const info = await transporter.sendMail({
        from: `"${this.defaultFromName}" <${this.defaultFromAddress}>`,
        to,
        subject,
        text,
        html,
      })
      console.log(`Email sent: ${info.messageId}`)
      return info
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: emailAdapter,
  collections: [Users, Media, Posts, Comments, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
