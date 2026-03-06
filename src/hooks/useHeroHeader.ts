"use client"

import { useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";

type HeaderTheme = "auto" | "light" | "dark";

/**
 * Вызови этот хук в компоненте страницы, если первая секция имеет фоновую картинку.
 * @param theme "dark" — картинка тёмная (текст белый), "light" — картинка светлая (текст чёрный)
 */
export const useHeroHeader = (theme: HeaderTheme = "dark") => {
    const { setHeaderStyle, resetHeaderStyle } = useHeader();

    useEffect(() => {
        setHeaderStyle(true, theme);
        return () => resetHeaderStyle();
    }, [theme, setHeaderStyle, resetHeaderStyle]);
};

