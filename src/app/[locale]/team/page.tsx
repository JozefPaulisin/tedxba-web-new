import OrganizerCard from "@/components/ui/OrganizerCard";
import { getTranslations } from "next-intl/server";
import { getPayload } from 'payload';
import config from '@payload-config';
import CtaSection from "@/sections/CtaSection";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TeamMetadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

const Team = async () => {
    const t = await getTranslations('TeamPage');

    const payload = await getPayload({ config });
    const { docs: members } = await payload.find({
        collection: 'team-members',
        sort: 'order',
        limit: 100,
    });

    return (
        <>
            <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 flex flex-col gap-6 mt-20">
                <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">{t('title')}</h2>
                <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                    {members.map((member) => {
                        const imgUrl = member.img && typeof member.img === 'object' && 'url' in member.img
                            ? (member.img.url as string)
                            : undefined;
                        return (
                            <OrganizerCard
                                key={member.id}
                                name={member.name as string}
                                role={member.role as string}
                                img={imgUrl}
                                linkedin={member.linkedin as string | undefined}
                                mail={member.mail as string | undefined}
                            />
                        );
                    })}
                </div>
            </section>
            <CtaSection />
        </>
    );
}

export default Team;