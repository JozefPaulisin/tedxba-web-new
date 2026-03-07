import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import CtaSection from '@/sections/CtaSection'

type Props = {
    params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
    });
    const article = result.docs[0];
    if (!article) return {};
    return {
        title: article.title as string,
        description: article.description as string,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayload({ config })

    const result = await payload.find({
        collection: 'articles',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
    })

    const article = result.docs[0]
    if (!article) notFound()

    const imageUrl =
        article.image && typeof article.image === 'object' && 'url' in article.image
            ? (article.image.url as string)
            : undefined

    const imageAlt =
        article.image && typeof article.image === 'object' && 'alt' in article.image
            ? (article.image.alt as string) || (article.title as string)
            : (article.title as string)

    const dateFormatted = article.date
        ? new Date(article.date as string).toLocaleDateString('sk-SK', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : ''

    return (
        <>
            <article className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 mt-20">
                {/* Header */}
                <header className="flex flex-col gap-4 max-w-[780px]">
                    <h1 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[48px] text-[32px] leading-tight">
                        {article.title as string}
                    </h1>
                    <div className="flex gap-4 text-sm text-txt-black-ter dark:text-txt-white-ter">
                        <span>{dateFormatted}</span>
                        <span>{article.author as string}</span>
                    </div>
                </header>

                {/* Cover image */}
                {imageUrl && (
                    <div className="relative w-full h-[420px] mt-8 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="object-cover h-full max-w-[780px]"
                        />
                    </div>
                )}

                {/* Rich text content */}
                {article.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-[780px] mt-10 mb-20">
                        <RichText data={article.content} />
                    </div>
                )}
            </article>

            <CtaSection />
        </>
    )
}