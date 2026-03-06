import { Link } from "@/i18n/navigation";

type ArticleCardProps = {
    title: string;
    date: string;
    author: string;
    description: string;
    imageUrl?: string;
    slug: string;
}

const ArticleCard = (
    {
        title,
        date,
        author,
        description,
        imageUrl,
        slug
    } : ArticleCardProps
) => {
    return (
        <Link href={`/blog/${slug}`} passHref>
            <img
                src={imageUrl || "/images/blog/default.png"}
                alt={title}
                className="w-full h-[250px] object-cover"
            />
            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-txt-black-prim dark:text-txt-white-prim md:text-xl text-lg">
                    {title}
                </h3>
                <div className="flex gap-4 text-sm text-txt-black-ter dark:text-txt-white-ter">
                    <span>
                        {date}
                    </span>
                    <span>
                        {author}
                    </span>
                </div>
                <p className="text-base text-txt-black-sec dark:text-txt-white-sec line-clamp-3 overflow-hidden">
                    {description}
                </p>
            </div>
        </Link>
    )
}

export default ArticleCard;