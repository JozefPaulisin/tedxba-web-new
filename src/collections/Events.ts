import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'Event',
        plural: 'Events',
    },
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'year', 'isActive'],
        group: 'Content',
        description: 'Annual TEDxBratislava events. Each year gets its own page at /{year}.',
    },
    fields: [
        // ─── Meta ──────────────────────────────────────────────────────────
        {
            name: 'year',
            type: 'number',
            label: 'Year',
            required: true,
            unique: true,
            admin: {
                description: 'e.g. 2025 — will create page at /2025',
            },
        },
        {
            name: 'title',
            type: 'text',
            label: 'Event title (for CMS display)',
            required: true,
            admin: {
                description: 'e.g. TEDxBratislava 2025',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'Current / active event (shown as main link in header)',
            defaultValue: false,
        },
        {
            name: 'ctaSection',
            type: 'select',
            label: 'CTA Section (shown at the bottom of this event page)',
            defaultValue: 'newsletter',
            required: true,
            options: [
                { label: 'Newsletter', value: 'newsletter' },
                { label: 'Buy Tickets', value: 'buyTickets' },
                { label: 'None', value: 'none' },
            ],
        },

        // ─── Hero Section ─────────────────────────────────────────────────
        {
            name: 'hero',
            type: 'group',
            label: 'Hero Section',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Background image',
                    required: false,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Title (SK)',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Title (EN)',
                },
                {
                    name: 'subtitleSk',
                    type: 'textarea',
                    label: 'Subtitle (SK)',
                },
                {
                    name: 'subtitleEn',
                    type: 'textarea',
                    label: 'Subtitle (EN)',
                },
                {
                    name: 'primaryBtn',
                    type: 'group',
                    label: 'Primary button',
                    fields: [
                        {
                            name: 'type',
                            type: 'select',
                            label: 'Button type',
                            defaultValue: 'buy-tickets',
                            options: [
                                { label: 'Buy tickets', value: 'buy-tickets' },
                                { label: 'View photos', value: 'photos' },
                                { label: 'Watch video', value: 'video' },
                            ],
                        },
                        {
                            name: 'labelSk',
                            type: 'text',
                            label: 'Label (SK)',
                        },
                        {
                            name: 'labelEn',
                            type: 'text',
                            label: 'Label (EN)',
                        },
                        {
                            name: 'href',
                            type: 'text',
                            label: 'Link URL',
                        },
                    ],
                },
                {
                    name: 'secondaryBtn',
                    type: 'group',
                    label: 'Secondary button (Support the event)',
                    fields: [
                        {
                            name: 'enabled',
                            type: 'checkbox',
                            label: 'Show secondary button',
                            defaultValue: true,
                        },
                        {
                            name: 'labelSk',
                            type: 'text',
                            label: 'Label (SK)',
                            defaultValue: 'Podporiť podujatie',
                        },
                        {
                            name: 'labelEn',
                            type: 'text',
                            label: 'Label (EN)',
                            defaultValue: 'Support the event',
                        },
                        {
                            name: 'href',
                            type: 'text',
                            label: 'Link URL',
                            defaultValue: '/support',
                        },
                    ],
                },
            ],
        },

        // ─── Tickets / Inviton iframe ─────────────────────────────────────
        {
            name: 'tickets',
            type: 'group',
            label: 'Tickets Section (Inviton iframe)',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order (position on page, 1 = first after hero)',
                    defaultValue: 1,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show tickets section',
                    defaultValue: true,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Section title (SK)',
                    defaultValue: 'Lístky',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Section title (EN)',
                    defaultValue: 'Tickets',
                },
                {
                    name: 'iframeCode',
                    type: 'textarea',
                    label: 'Inviton iframe HTML code',
                    admin: {
                        description: 'Paste the full <iframe> HTML from Inviton here.',
                    },
                },
            ],
        },

        // ─── Speakers ─────────────────────────────────────────────────────
        {
            name: 'speakers',
            type: 'group',
            label: 'Speakers Section',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    defaultValue: 2,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show speakers section',
                    defaultValue: true,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Section title (SK)',
                    defaultValue: 'Rečníci',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Section title (EN)',
                    defaultValue: 'Speakers',
                },
                {
                    name: 'items',
                    type: 'array',
                    label: 'Speaker list',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            label: 'Name',
                            required: true,
                        },
                        {
                            name: 'descriptionSk',
                            type: 'textarea',
                            label: 'Description (SK)',
                        },
                        {
                            name: 'descriptionEn',
                            type: 'textarea',
                            label: 'Description (EN)',
                        },
                        {
                            name: 'img',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Photo',
                        },
                    ],
                },
            ],
        },

        // ─── Program ──────────────────────────────────────────────────────
        {
            name: 'program',
            type: 'group',
            label: 'Program Section',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    defaultValue: 3,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show program section',
                    defaultValue: true,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Section title (SK)',
                    defaultValue: 'Program',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Section title (EN)',
                    defaultValue: 'Program',
                },
                {
                    name: 'items',
                    type: 'array',
                    label: 'Program items',
                    fields: [
                        {
                            name: 'time',
                            type: 'text',
                            label: 'Time (e.g. 10:00)',
                        },
                        {
                            name: 'titleSk',
                            type: 'text',
                            label: 'Title (SK)',
                            required: true,
                        },
                        {
                            name: 'titleEn',
                            type: 'text',
                            label: 'Title (EN)',
                        },
                        {
                            name: 'descriptionSk',
                            type: 'textarea',
                            label: 'Description (SK)',
                        },
                        {
                            name: 'descriptionEn',
                            type: 'textarea',
                            label: 'Description (EN)',
                        },
                    ],
                },
            ],
        },

        // ─── Activities ───────────────────────────────────────────────────
        {
            name: 'activities',
            type: 'group',
            label: 'Activities Section',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    defaultValue: 4,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show activities section',
                    defaultValue: false,
                },
            ],
        },

        // ─── Photos (Flickr) ──────────────────────────────────────────────
        {
            name: 'photos',
            type: 'group',
            label: 'Photos Section (Flickr)',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    defaultValue: 5,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show photos section',
                    defaultValue: false,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Section title (SK)',
                    defaultValue: 'Fotografie',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Section title (EN)',
                    defaultValue: 'Photos',
                },
                {
                    name: 'iframeCode',
                    type: 'textarea',
                    label: 'Flickr iframe HTML code',
                    admin: {
                        description: 'Paste the full <iframe> or embed HTML from Flickr here.',
                    },
                },
            ],
        },

        // ─── Partners ─────────────────────────────────────────────────────
        {
            name: 'partnersSection',
            type: 'group',
            label: 'Partners Section',
            fields: [
                {
                    name: 'order',
                    type: 'number',
                    label: 'Order',
                    defaultValue: 6,
                    admin: { step: 1 },
                },
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Show partners section',
                    defaultValue: true,
                },
                {
                    name: 'titleSk',
                    type: 'text',
                    label: 'Section title (SK)',
                    defaultValue: 'Partneri',
                },
                {
                    name: 'titleEn',
                    type: 'text',
                    label: 'Section title (EN)',
                    defaultValue: 'Partners',
                },
                {
                    name: 'categories',
                    type: 'array',
                    label: 'Partner categories (e.g. Gold, Silver, Media)',
                    fields: [
                        {
                            name: 'slug',
                            type: 'text',
                            label: 'Slug (internal key, e.g. gold)',
                            required: true,
                        },
                        {
                            name: 'labelSk',
                            type: 'text',
                            label: 'Label (SK)',
                            required: true,
                        },
                        {
                            name: 'labelEn',
                            type: 'text',
                            label: 'Label (EN)',
                            required: true,
                        },
                        {
                            name: 'partners',
                            type: 'relationship',
                            relationTo: 'partners',
                            hasMany: true,
                            label: 'Partners in this category',
                        },
                    ],
                },
            ],
        },
    ],
}