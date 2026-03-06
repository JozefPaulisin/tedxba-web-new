export type ArticleItem = {
    title: string
    date: string
    author: string
    description: string
    imageUrl?: string
    slug: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function docToItem(doc: any): ArticleItem {
    const imageUrl =
        doc.image && typeof doc.image === 'object' && doc.image.url
            ? (doc.image.url as string)
            : undefined

    const date = doc.date
        ? new Date(doc.date).toLocaleDateString('sk-SK', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
          })
        : ''

    return {
        title: doc.title ?? '',
        date,
        author: doc.author ?? '',
        description: doc.description ?? '',
        imageUrl,
        slug: doc.slug ?? '',
    }
}