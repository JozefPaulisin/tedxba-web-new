import Link from "next/link";
import Image from "next/image";
import {
    RiInstagramFill,
    RiLinkedinBoxFill,
    RiFacebookBoxFill,
    RiTwitterXFill,
    RiYoutubeFill,
    RiFlickrFill,
} from "@remixicon/react";

const legal = [
    {
        name: "Reklamačný formulár",
        href: "https://www.tedxbratislava.sk/wp-content/uploads/Reklamacny_formular-TEDx-1.pdf"
    },
    {
        name: "VOP",
        href: "/terms"
    },
    {
        name: "Ochrana osobných údajov",
        href: "/privacy"
    }
]

const nav = [
    {
        name: "Katalóg",
        href: "/catalog"
    },
    {
        name: "Tím",
        href: "/team"
    },
    {
        name: "Blog",
        href: "/blog"
    },
    {
        name: "Podporte nás",
        href: "/support"
    }
]

const socials = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/tedxbratislava/",
        icon: RiInstagramFill
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/tedx-bratislava/",
        icon: RiLinkedinBoxFill
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/tedxbratislava",
        icon: RiFacebookBoxFill
    },
    {
        name: "X",
        href: "https://x.com/TEDxBratislava",
        icon: RiTwitterXFill
    },
    {
        name: "Youtube",
        href: "https://www.youtube.com/user/tedxbratislava",
        icon: RiYoutubeFill
    },
    {
        name: "Flickr",
        href: "https://www.flickr.com/photos/tedxbratislava/",
        icon: RiFlickrFill
    }
]

const Footer = () => {
    return (
        <footer className="xl:w-[1238px] lg:w-[950px] lg:mx-auto w-auto mx-5 flex flex-col gap-20 md:my-25 my-15">
            <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-[auto_1fr] gap-5">
                <div className="lg:h-full h-fit lg:my-0 md:my-6 flex items-center lg:col-span-1 md:col-span-2">
                    <Image src="/logo/logo.svg" alt="Logo TEDxBratislava" width={322} height={36} />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <h3 className="font-medium text-lg dark:text-txt-white-prim text-txt-black-prim">
                            Navigácia
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
                            Sociálne siete
                        </h3>
                        <div className="flex gap-5">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                >
                                    <social.icon size={24} className="hover:text-red text-txt-black-sec dark:text-txt-white-sec transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="font-medium text-lg dark:text-txt-white-prim text-txt-black-prim">
                        Kontakt
                    </h3>
                    <ul className="text-txt-black-sec dark:text-txt-white-sec flex flex-col gap-2 md:text-lg text-base font-light">
                        <li>TEDxBratislava o.z.</li>
                        <li>Tomášikova 12570/50A, 831 04 Bratislava-Nové Mesto</li>
                        <div className="flex sm:gap-7 gap-2 sm:flex-row flex-col">
                            <li>IČO: 422 607 44</li>
                            <li>DIČ: 2023712636</li>
                        </div>
                        <li>Číslo účtu: 2924872932/1100</li>
                        <li>IBAN: SK97 1100 0000 0029 2487 2932</li>
                    </ul>
                </div>
            </div>
            <div className="flex justify-between lg:flex-row flex-col gap-5">
                <div className="flex md:gap-7 gap-3 font-light text-[14px] flex-wrap">
                    <span className="text-txt-black-ter dark:text-txt-white-ter">
                        © TEDxBratislava {new Date().getFullYear()}
                    </span>
                    <span className="text-txt-black-ter dark:text-txt-white-ter">
                        Product by <a href="https://noflowcharts.com" target="_blank"
                                      className="hover:text-red transition-all duration-300">NoFlowCharts</a>
                    </span>
                </div>
                <div className="flex md:gap-7 gap-3 font-light text-[14px] flex-wrap">
                    {legal.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-txt-black-ter dark:text-txt-white-ter hover:text-red transition-all duration-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer;