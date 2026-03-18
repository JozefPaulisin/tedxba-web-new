import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'

// ✅ + .ts prípony
import { Media } from './src/collections/Media.js'
import { TeamMembers } from './src/collections/TeamMembers.js'
import { Articles } from './src/collections/Articles.js'
import { Partners } from './src/collections/Partners.js'
import { Events } from './src/collections/Events.js'

import { SiteSettings } from './src/globals/SiteSettings.js'
import { SupportSettings } from './src/globals/SupportSettings.js'
import { BlogSettings } from './src/globals/BlogSettings.js'

export default buildConfig({
  editor: lexicalEditor(),

  collections: [Media, TeamMembers, Articles, Partners, Events],
  globals: [SiteSettings, SupportSettings, BlogSettings],

  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: './migrations',
    push: true,
  }),

  sharp,

  graphQL: {
    disable: true,
  },
})
