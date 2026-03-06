'use client'

import { useEffect, useRef, useState } from 'react'
import ArticleCard from './ArticleCard'

export type ArticleItem = {
    title: string
    date: string
    author: string
    description: string
    imageUrl?: string
    slug: string
}

type Props = {
    initialArticles: ArticleItem[]
    initialHasNextPage: boolean
}

const LIMIT = 9

export default function InfiniteScrollArticles({ initialArticles, initialHasNextPage }: Props) {
    const [articles, setArticles] = useState<ArticleItem[]>(initialArticles)
    const [page, setPage] = useState(2)
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
    const [loading, setLoading] = useState(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !loading) {
                    loadMore()
                }
            },
            { rootMargin: '200px' }
        )

        observer.observe(sentinel)
        return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasNextPage, loading, page])

    async function loadMore() {
        setLoading(true)
        try {
            const res = await fetch(
                `/api/articles?limit=${LIMIT}&page=${page}&sort=-date&depth=1`
            )
            const data = await res.json()
            const newArticles: ArticleItem[] = (data.docs ?? []).map(docToItem)
            setArticles((prev) => [...prev, ...newArticles])
            setHasNextPage(data.hasNextPage ?? false)
            setPage((p) => p + 1)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {articles.map((article) => (
                    <ArticleCard key={article.slug} {...article} />
                ))}
            </div>

            {/* sentinel */}
            <div ref={sentinelRef} className="h-1" />

            {loading && (
                <div className="flex justify-center py-8">
                    <span className="text-txt-black-sec dark:text-txt-white-sec text-sm animate-pulse">
                        Loading…
                    </span>
                </div>
            )}
        </>
    )
}


