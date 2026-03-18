import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'

// ✅ + .ts prípony
import { Media } from './src/collections/Media.ts'
import { TeamMembers } from './src/collections/TeamMembers.ts'
import { Articles } from './src/collections/Articles.ts'
import { Partners } from './src/collections/Partners.ts'
import { Events } from './src/collections/Events.ts'

import { SiteSettings } from './src/globals/SiteSettings.ts'
import { SupportSettings } from './src/globals/SupportSettings.ts'
import { BlogSettings } from './src/globals/BlogSettings.ts'

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
