"use client"

import { useEffect, useRef } from "react";
import { useHeader } from "@/context/HeaderContext";

type HeaderTheme = "auto" | "light" | "dark";

/**
 * Добавь этот компонент ВНУТРЬ hero-секции с фоновой картинкой (в самый конец).
 * Он сделает хедер прозрачным пока hero виден, и вернёт фон когда пользователь прокрутит.
 */
const HeroHeaderActivator = ({ theme = "dark" }: { theme?: HeaderTheme }) => {
    const { setHeaderStyle, resetHeaderStyle } = useHeader();
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        // Сразу активируем прозрачный хедер
        setHeaderStyle(true, theme);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Hero виден — хедер прозрачный
                    setHeaderStyle(true, theme);
                } else {
                    // Hero ушёл — возвращаем нормальный хедер
                    resetHeaderStyle();
                }
            },
            // Триггерим когда нижний край hero уходит за верхний край viewport
            { threshold: 0, rootMargin: "0px 0px 0px 0px" }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            resetHeaderStyle();
        };
    }, [theme, setHeaderStyle, resetHeaderStyle]);

    // Невидимый маркер в конце hero-секции
    return <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-full h-px" />;
};

export default HeroHeaderActivator;


