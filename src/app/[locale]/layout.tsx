import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { HeaderProvider } from "@/context/HeaderContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.tedxbratislava.sk";

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  sk: "sk_SK",
};

function getLocalizedUrl(locale: string) {
  return locale === routing.defaultLocale
    ? `${BASE_URL}/`
    : `${BASE_URL}/${locale}`;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F0F1",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const canonicalUrl = getLocalizedUrl(locale);

  const languages: Record<string, string> = {
    "x-default": `${BASE_URL}/`,
  };
  for (const loc of routing.locales) {
    languages[loc] = getLocalizedUrl(loc);
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title.default"),
      template: t("title.template"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "TEDxBratislava" }],
    creator: "TEDxBratislava",
    publisher: "TEDxBratislava",
    icons: {
      icon: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t("title.default"),
      description: t("description"),
      url: BASE_URL,
      siteName: "TEDxBratislava",
      images: [
        {
          url: "/images/seo/og.png",
          width: 1200,
          height: 630,
          alt: "TEDxBratislava",
        },
      ],
      locale: OG_LOCALES[locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title.default"),
      description: t("description"),
      images: ["/images/seo/og.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TEDxBratislava",
    "url": "https://www.tedxbratislava.sk/",

    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SK"
    },
    sameAs: [
      'https://www.instagram.com/tedxbratislava/',
      'https://www.linkedin.com/company/tedx-bratislava/',
      'https://www.facebook.com/tedxbratislava',
      'https://x.com/TEDxBratislava',
      'https://www.youtube.com/user/tedxbratislava',
      'https://www.flickr.com/photos/tedxbratislava/'
    ]
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <HeaderProvider>
              <Header />
              {children}
              <Footer />
            </HeaderProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
    </html>
  );
}