import CtaSection from "@/sections/CtaSection";
import Button from "@/components/Button";
import HeroHeaderActivator from "@/components/HeroHeaderActivator";
import PartnerCard from "@/components/ui/PartnerCard";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SupportMetadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";

type MediaObj = { url?: string | null };

const Support = async () => {
    const t = await getTranslations('SupportPage');
    const locale = await getLocale();

    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: 'support-settings' });

    const partnersResult = await payload.find({
        collection: 'partners',
        where: {
            pages: { in: ['support'] },
        },
        depth: 1,
        limit: 100,
    });
    const partners = partnersResult.docs;

    const isSk = locale === 'sk';

    const contactBtnLabel =
        (isSk ? settings.contactBtn?.labelSk : settings.contactBtn?.labelEn) || t('partner.contactBtn');
    const contactBtnHref = settings.contactBtn?.href || 'mailto:partneri@tedxbratislava.sk';

    const callBtnLabel =
        (isSk ? settings.callBtn?.labelSk : settings.callBtn?.labelEn) || t('partner.callBtn');
    const callBtnHref = settings.callBtn?.href || 'tel:+421949875764';

    const volunteerBtnLabel =
        (isSk ? settings.volunteerBtn?.labelSk : settings.volunteerBtn?.labelEn) || t('volunteer.btn');
    const volunteerBtnHref = settings.volunteerBtn?.href || 'mailto:partneri@tedxbratislava.sk';

    return (
        <>
            <section className="relative w-full h-[100vh] bg-[url('/images/support/hero.png')] bg-cover bg-center">
                <HeroHeaderActivator theme="dark" />
                <div className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto h-full mx-5 flex flex-col gap-6 justify-center">
                    <div className="max-w-[540px] flex flex-col gap-6">
                        <h2 className="font-medium text-txt-white-prim md:text-[40px] text-[32px] leading-tight">
                            {t('hero.title')}
                        </h2>
                        <div className="flex flex-wrap gap-4 items-start">
                            <Button
                                text={t('hero.supportBtn')}
                                variant="primary"
                                className="hover:!text-txt-black-prim hover:!bg-white"
                                href="#partner"
                            />
                            <Button
                                className="!text-txt-white-prim"
                                text={t('hero.volunteerBtn')}
                                variant="secondary"
                                href="#staff"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id="partner" className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 items-center gap-5 mt-20 flex lg:flex-row flex-col">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">
                            {t('partner.title')}
                        </h2>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            {t('partner.description')}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <Button
                            text={contactBtnLabel}
                            variant="primary"
                            href={contactBtnHref}
                        />
                        <Button
                            text={callBtnLabel}
                            variant="secondary"
                            href={callBtnHref}
                        />
                    </div>
                </div>
                <img
                    src="/images/support/partner.png"
                    alt="Support us"
                    className="xl:w-[580px] xl:h-[580px] lg:w-[460px] lg:h-[460px] h-[300px] w-full object-cover rounded-[4px]"
                />
            </section>
            <section id="staff" className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 items-center gap-5 mt-20 flex lg:flex-row flex-col">
                <img
                    src="/images/support/staff.png"
                    alt="Support us"
                    className="xl:w-[580px] xl:h-[580px] lg:w-[460px] lg:h-[460px] h-[300px] w-full object-cover rounded-[4px]"
                />
                <div className="flex flex-col gap-6 items-start">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-medium text-txt-black-prim dark:text-txt-white-prim md:text-[40px] text-[32px]">
                            {t('volunteer.title')}
                        </h2>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            {t('volunteer.p1')}
                        </p>
                        <p className="font-light md:text-xl text-lg text-txt-black-sec dark:text-txt-white-sec">
                            {t('volunteer.p2')}
                        </p>
                    </div>
                    <Button
                        text={volunteerBtnLabel}
                        variant="primary"
                        href={volunteerBtnHref}
                    />
                </div>
            </section>
            {partners.length > 0 && (
                <section className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 items-center gap-5 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 md:mt-25 mt-15">
                    {partners.map((partner) => {
                        const logoUrl = typeof partner.logo === 'object' && partner.logo !== null
                            ? (partner.logo as MediaObj).url ?? ''
                            : '';
                        return (
                            <PartnerCard
                                key={partner.id}
                                name={partner.name}
                                logo={logoUrl}
                                web={partner.web ?? undefined}
                            />
                        );
                    })}
                </section>
            )}
            <CtaSection />
        </>
    );
};

export default Support;