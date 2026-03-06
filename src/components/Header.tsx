"use client"

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { RiMenuFill, RiCloseFill } from "@remixicon/react";

const links = [
    { href: "/catalog", label: "Katalóg" },
    { href: "/blog", label: "Blog" },
    { href: "/support", label: "Podporte nás" },
    { href: "/team", label: "Tím" },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledHandleScroll);
        return () => window.removeEventListener("scroll", throttledHandleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-30 bg-white dark:bg-[#1F1E1E] transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="xl:w-[1238px] lg:w-[950px] lg:mx-auto w-auto mx-5 flex justify-between items-center lg:my-6 my-5">
                <Link href="/">
                    <Image src="/logo/logo.svg" alt="Logo TEDxBratislava" width={215} height={24} />
                </Link>
                <nav className="lg:flex hidden items-center gap-7">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-txt-black-prim dark:text-txt-white-prim hover:text-red font-light text-xl transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <RiMenuFill
                    className="lg:hidden block cursor-pointer"
                    size={28}
                    onClick={() => setIsMenuOpen(true)}
                />

                {isMenuOpen && ReactDOM.createPortal(
                    <>
                        <div
                            className="fixed inset-0 bg-black/60 z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <div className="fixed inset-0 flex flex-col gap-6 justify-start items-center h-screen w-screen z-50">
                            <div className="flex justify-between items-center w-full p-5 mb-10">
                                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                                    <Image src="/logo/logo.svg" alt="Logo TEDxBratislava" width={215} height={24} />
                                </Link>
                                <RiCloseFill
                                    className="cursor-pointer"
                                    size={28}
                                    onClick={() => setIsMenuOpen(false)}
                                />
                            </div>
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-txt-black-prim dark:text-txt-white-prim hover:text-red text-xl font-light transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </>,
                    document.body
                )}
            </div>
        </header>
    );
};

export default Header;