import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import Newsletter from "@/sections/newsletter";
import BuyTicketsCta from "@/sections/buyTicketsCta";

type Props = { params: Promise<{ locale: string; year: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, year } = await params;

    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'events',
        where: { year: { equals: parseInt(year) } },
        depth: 1,
        limit: 1,
    });
    const event = result.docs[0] as Record<string, unknown> | undefined;
    if (!event) return {};

    const hero = event.hero as Record<string, unknown> | undefined;
    const isSk = locale === 'sk';
    const heroTitle = hero?.[isSk ? 'titleSk' : 'titleEn'] as string | undefined;
    const heroSubtitle = hero?.[isSk ? 'subtitleSk' : 'subtitleEn'] as string | undefined;

    return {
        title: heroTitle || `TEDxBratislava ${year}`,
        description: heroSubtitle || `TEDxBratislava ${year}`,
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


export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config });
        const result = await payload.find({ collection: 'events', limit: 100, depth: 0 });
        return result.docs.map((ev) => ({ year: String(ev.year) }));
    } catch {
        return [];
    }
}

export default async function EventYearPage({ params }: Props) {
    const { year } = await params;

    if (!/^\d{4}$/.test(year)) return notFound();

    const locale = await getLocale();
    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: 'events',
        where: { year: { equals: parseInt(year) } },
        depth: 2,
        limit: 1,
    });

    const event = result.docs[0];
    if (!event) return notFound();

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