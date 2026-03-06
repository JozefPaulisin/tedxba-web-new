import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

function titleToSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // strip diacritics
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

export const Articles: CollectionConfig = {
    slug: 'articles',
    labels: {
        singular: 'Article',
        plural: 'Articles',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'date', 'slug'],
    },
    hooks: {
        beforeOperation: [
            async ({ args, operation }) => {
                // Only on create
                if (operation !== 'create') return args
                const title = args.data?.title as string | undefined
                if (!title) return args

                const baseSlug = titleToSlug(title)
                const req = args.req
                let candidate = baseSlug
                let counter = 1

                // Keep trying until we find a free slug
                while (true) {
                    const existing = await req.payload.find({
                        collection: 'articles',
                        where: { slug: { equals: candidate } },
                        limit: 1,
                        depth: 0,
                        req,
                    })
                    if (existing.totalDocs === 0) break
                    candidate = `${baseSlug}-${counter}`
                    counter++
                }

                args.data.slug = candidate
                return args
            },
        ],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug',
            required: true,
            unique: true,
            admin: {
                readOnly: true,
                description: 'Auto-generated from the title. Cannot be changed after creation.',
                position: 'sidebar',
            },
        },
        {
            name: 'date',
            type: 'date',
            label: 'Publish Date',
            required: true,
            defaultValue: () => new Date().toISOString(),
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'd. M. yyyy',
                },
            },
        },
        {
            name: 'author',
            type: 'text',
            label: 'Author',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Short Description',
            required: true,
            admin: {
                description: 'Shown on article cards and as meta description.',
            },
        },
        {
            name: 'image',
            type: 'upload',
            label: 'Cover Image',
            relationTo: 'media',
            required: false,
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
            editor: lexicalEditor(),
            required: false,
        },
    ],
}