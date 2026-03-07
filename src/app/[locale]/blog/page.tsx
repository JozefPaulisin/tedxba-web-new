import CtaSection from "@/sections/CtaSection";
import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import InfiniteScrollArticles from "@/components/ui/InfiniteScrollArticles";
import { docToItem } from "@/lib/articleUtils";
import type { Metadata } from "next";

const LIMIT = 9;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BlogMetadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

const Blog = async () => {
    const t = await getTranslations('BlogPage');

    const payload = await getPayload({ config });

    const [settings, articlesResult] = await Promise.all([
        payload.findGlobal({ slug: 'blog-settings' }),
        payload.find({
            collection: 'articles',
            limit: LIMIT,
            page: 1,
            sort: '-date',
            depth: 1,
        }),
    ]);

    const podcastIframe = settings.podcastIframe as string | null | undefined;
    const initialArticles = articlesResult.docs.map(docToItem);
    const initialHasNextPage = articlesResult.hasNextPage;

    return (
        <>
            <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto h-full mx-5 flex flex-col gap-4 justify-center mt-20">
                <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px] leading-tight">
                    {t('podcast.title')}
                </h2>
                <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec max-w-[780px]">
                    {t('podcast.description')}
                </p>
                {podcastIframe && (
                    <div
                        className="w-full mt-2"
                        dangerouslySetInnerHTML={{ __html: podcastIframe }}
                    />
                )}
            </section>
            <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto h-full mx-5 flex flex-col gap-6 justify-center md:mt-25 mt-15">
                <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px] leading-tight">
                    {t('articles.title')}
                </h2>
                <InfiniteScrollArticles
                    initialArticles={initialArticles}
                    initialHasNextPage={initialHasNextPage}
                />
            </section>
            <CtaSection />
        </>
    );
};

export default Blog;