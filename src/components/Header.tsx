"use client"

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { RiMenuFill, RiCloseFill } from "@remixicon/react";
import { useHeader } from "@/context/HeaderContext";

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
    const { transparent, theme } = useHeader();

    // Определяем цвет текста: если хедер прозрачный, то цвет зависит от theme
    // theme="dark" (картинка тёмная) → текст белый
    // theme="light" (картинка светлая) → текст чёрный
    // theme="auto" → стандартное поведение (тёмная/светлая тема сайта)
    const isOverImage = transparent;
    const textColorClass = isOverImage
        ? theme === "light"
            ? "text-txt-black-prim"
            : "text-txt-white-prim"
        : "text-txt-black-prim dark:text-txt-white-prim";
    const iconColorClass = isOverImage
        ? theme === "light"
            ? "text-txt-black-prim"
            : "text-white"
        : "text-txt-black-prim dark:text-txt-white-prim";

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
            className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            } ${
                isOverImage
                    ? "bg-transparent"
                    : "bg-white dark:bg-[#1F1E1E]"
            }`}
        >
            <div className="xl:w-[1180px] lg:w-[940px] lg:mx-auto w-auto mx-5 flex justify-between items-center lg:my-6 my-5">
                <Link href="/">
                    <Logo
                        width={215}
                        height={24}
                        style={isOverImage && theme !== "light" ? { color: "white", ["--logo-ink" as string]: "white" } : undefined}
                    />
                </Link>
                <nav className="lg:flex hidden items-center gap-7">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${textColorClass} hover:text-red font-light text-xl transition-colors duration-300`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <RiMenuFill
                    className={`lg:hidden block cursor-pointer ${iconColorClass}`}
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
                                    <Logo width={215} height={24} />
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