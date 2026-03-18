import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { Media } from '@/collections/Media'
import { TeamMembers } from '@/collections/TeamMembers'
import { Articles } from '@/collections/Articles'
import { Partners } from '@/collections/Partners'
import { Events } from '@/collections/Events'
import { SiteSettings } from '@/globals/SiteSettings'
import { SupportSettings } from '@/globals/SupportSettings'
import { BlogSettings } from '@/globals/BlogSettings'

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Media, TeamMembers, Articles, Partners, Events],
    globals: [SiteSettings, SupportSettings, BlogSettings],
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
    db: postgresAdapter({
        pool: pool: {
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
