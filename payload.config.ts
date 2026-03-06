import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { Media } from '@/collections/Media'
import { TeamMembers } from '@/collections/TeamMembers'
import { Articles } from '@/collections/Articles'
import { SiteSettings } from '@/globals/SiteSettings'
import { SupportSettings } from '@/globals/SupportSettings'
import { BlogSettings } from '@/globals/BlogSettings'

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Media, TeamMembers, Articles],
    globals: [SiteSettings, SupportSettings, BlogSettings],
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-dev',
    db: postgresAdapter({
        pool: {
            host: 'localhost',
            port: 5432,
            database: 'tedx-ba',
            user: 'postgres',
            password: 'postgres',
        },
        migrationDir: './migrations',
        push: true,
    }),
    sharp,
    graphQL: {
        disable: true,
    },
})