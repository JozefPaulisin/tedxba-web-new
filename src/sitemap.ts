import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.tedxbratislava.sk';

// sk is the default locale (no prefix), en gets /en prefix
const locales = ['sk', 'en'] as const;

// All public pages (relative paths, '' = home)
const pages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '',         changeFrequency: 'daily',   priority: 1.0 },
    { path: '/blog',    changeFrequency: 'weekly',  priority: 0.8 },
    { path: '/support', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/team',    changeFrequency: 'monthly', priority: 0.6 },
    { path: '/privacy', changeFrequency: 'yearly',  priority: 0.3 },
    { path: '/terms',   changeFrequency: 'yearly',  priority: 0.3 },
];

function getLocalizedUrl(locale: string, path: string): string {
    // sk (default) — no locale prefix; en — /en prefix
    if (locale === 'sk') {
        return `${BASE_URL}${path || '/'}`;
    }
    return `${BASE_URL}/${locale}${path || ''}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const { path, changeFrequency, priority } of pages) {
        const languages: Record<string, string> = {};

        for (const locale of locales) {
            languages[locale] = getLocalizedUrl(locale, path);
        }
        // x-default points to the default locale (sk)
        languages['x-default'] = getLocalizedUrl('sk', path);

        entries.push({
            url: getLocalizedUrl('sk', path),
            lastModified: new Date(),
            changeFrequency,
            priority,
            alternates: { languages },
        });
    }

    return entries;
}