import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Newsletter from "@/sections/newsletter";
import BuyTicketsCta from "@/sections/buyTicketsCta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomeMetadata' });

    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'events',
        where: { isActive: { equals: true } },
        depth: 1,
        limit: 1,
    });
    const event = result.docs[0] as Record<string, unknown> | undefined;
    const hero = event?.hero as Record<string, unknown> | undefined;
    const isSk = locale === 'sk';
    const heroTitle = hero?.[isSk ? 'titleSk' : 'titleEn'] as string | undefined;
    const heroSubtitle = hero?.[isSk ? 'subtitleSk' : 'subtitleEn'] as string | undefined;

    return {
        title: heroTitle || t('title'),
        description: heroSubtitle || t('description'),
    };
}

import HeroSection from "@/sections/event/HeroSection";
import TicketsSection from "@/sections/event/TicketsSection";
import SpeakersSection from "@/sections/event/SpeakersSection";
import ProgramSection from "@/sections/event/ProgramSection";
import ActivitiesSection from "@/sections/event/ActivitiesSection";
import PhotosSection from "@/sections/event/PhotosSection";
import EventPartnersSection from "@/sections/event/EventPartnersSection";

const SECTIONS = ['tickets', 'speakers', 'program', 'activities', 'photos', 'partnersSection'] as const;

function renderSection(key: string, e: Record<string, unknown>, locale: string) {
    switch (key) {
        case 'tickets':
            return e.tickets ? <TicketsSection key={key} tickets={e.tickets as never} locale={locale} /> : null;
        case 'speakers':
            return e.speakers ? <SpeakersSection key={key} speakers={e.speakers as never} locale={locale} /> : null;
        case 'program':
            return e.program ? <ProgramSection key={key} program={e.program as never} locale={locale} /> : null;
        case 'activities':
            return e.activities ? <ActivitiesSection key={key} activities={e.activities as never} /> : null;
        case 'photos':
            return e.photos ? <PhotosSection key={key} photos={e.photos as never} locale={locale} /> : null;
        case 'partnersSection':
            return e.partnersSection ? <EventPartnersSection key={key} partnersSection={e.partnersSection as never} locale={locale} /> : null;
        default:
            return null;
    }
}

function getSortedSections(e: Record<string, unknown>) {
    return [...SECTIONS].sort((a, b) => {
        const orderA = (e[a] as Record<string, unknown>)?.order as number ?? 999;
        const orderB = (e[b] as Record<string, unknown>)?.order as number ?? 999;
        return orderA - orderB;
    });
}

export default async function Home() {
    const locale = await getLocale();
    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: 'events',
        where: { isActive: { equals: true } },
        depth: 2,
        limit: 1,
    });

    const event = result.docs[0];

    if (!event) {
        return (
            <main className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 flex items-center justify-center min-h-[60vh]">
                <p className="text-txt-black-sec dark:text-txt-white-sec text-xl font-light">
                    No active event configured.
                </p>
            </main>
        );
    }

    const e = event as Record<string, unknown>;

    return (
        <>
            {e.hero && <HeroSection hero={e.hero as never} locale={locale} />}
            {getSortedSections(e).map((key) => renderSection(key, e, locale))}
            {e.ctaSection === 'newsletter' && <Newsletter />}
            {e.ctaSection === 'buyTickets' && <BuyTicketsCta />}
        </>
    );
}