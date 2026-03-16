import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import {
    RiInstagramFill,
    RiLinkedinBoxFill,
    RiFacebookBoxFill,
    RiTwitterXFill,
    RiYoutubeFill,
    RiFlickrFill,
} from "@remixicon/react";
import { getTranslations } from "next-intl/server";

const socials = [
    { name: "Instagram", href: "https://www.instagram.com/tedxbratislava/", icon: RiInstagramFill },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/tedx-bratislava/", icon: RiLinkedinBoxFill },
    { name: "Facebook", href: "https://www.facebook.com/tedxbratislava", icon: RiFacebookBoxFill },
    { name: "X", href: "https://x.com/TEDxBratislava", icon: RiTwitterXFill },
    { name: "Youtube", href: "https://www.youtube.com/user/tedxbratislava", icon: RiYoutubeFill },
    { name: "Flickr", href: "https://www.flickr.com/photos/tedxbratislava/", icon: RiFlickrFill },
];

const Footer = async () => {
    const t = await getTranslations('Footer');

    const nav = [
        // { name: t('catalog'), href: "/catalog" },
        { name: t('team'), href: "/team" },
        { name: t('blog'), href: "/blog" },
        { name: t('support'), href: "/support" },
    ];

    const legal = [
        { name: t('claimForm'), href: "https://www.tedxbratislava.sk/wp-content/uploads/Reklamacny_formular-TEDx-1.pdf" },
        { name: t('terms'), href: "/terms" },
        { name: t('privacy'), href: "/privacy" },
    ];

    return (
        <footer className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 flex flex-col gap-20 md:my-25 my-15">
            <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-[auto_1fr] gap-5">
                <div className="lg:h-full h-fit lg:my-0 md:my-6 flex items-center lg:col-span-1 md:col-span-2">
                    <Link href="/">
                        <Logo width={322} height={36} />
                    </Link>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <h3 className="font-medium text-lg dark:text-txt-white-prim text-txt-black-prim">
                            {t('nav')}
                        </h3>
                        <div className="grid grid-cols-2 gap-5">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="dark:text-txt-white-sec text-txt-black-sec hover:text-red text-lg font-light transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h3 className="font-medium text-lg dark:text-txt-white-prim text-txt-black-prim">
                            {t('socials')}
                        </h3>
                        <div className="flex gap-5">
                            {socials.map((social) => (
                                <a key={social.name} href={social.href} target="_blank">
                                    <social.icon size={24} className="hover:text-red text-txt-black-sec dark:text-txt-white-sec transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="font-medium text-lg dark:text-txt-white-prim text-txt-black-prim">
                        {t('contact')}
                    </h3>
                    <ul className="text-txt-black-sec dark:text-txt-white-sec flex flex-col gap-2 md:text-lg text-base font-light">
                        <li>TEDxBratislava o.z.</li>
                        <li>{t('address')}</li>
                        <div className="flex sm:gap-7 gap-2 sm:flex-row flex-col">
                            <li>IČO: 422 607 44</li>
                            <li>DIČ: 2023712636</li>
                        </div>
                        <li>{t('accountNumber')}</li>
                        <li>{t('iban')}</li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-between lg:flex-row flex-col gap-5">
                <div className="flex md:gap-7 gap-3 font-light text-[14px] flex-wrap">
                    <span className="text-txt-black-ter dark:text-txt-white-ter">
                        © TEDxBratislava {new Date().getFullYear()}
                    </span>
                    <span className="text-txt-black-ter dark:text-txt-white-ter">
                        {t('productBy')} <a href="https://noflowcharts.com" target="_blank" className="hover:text-red transition-all duration-300">NoFlowCharts</a>
                    </span>
                </div>
                <div className="flex md:gap-7 gap-3 font-light text-[14px] flex-wrap">
                    {legal.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-txt-black-ter dark:text-txt-white-ter hover:text-red transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;