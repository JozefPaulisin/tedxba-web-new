import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'

// ✅ RELATÍVNE CESTY BEZ .ts / .js
import { Media } from './src/collections/Media'
import { TeamMembers } from './src/collections/TeamMembers'
import { Articles } from './src/collections/Articles'
import { Partners } from './src/collections/Partners'
import { Events } from './src/collections/Events'

import { SiteSettings } from './src/globals/SiteSettings'
import { SupportSettings } from './src/globals/SupportSettings'
import { BlogSettings } from './src/globals/BlogSettings'

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
