"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type HeaderTheme = "auto" | "light" | "dark";

interface HeaderContextValue {
    transparent: boolean;
    theme: HeaderTheme;
    setHeaderStyle: (transparent: boolean, theme?: HeaderTheme) => void;
    resetHeaderStyle: () => void;
}

const HeaderContext = createContext<HeaderContextValue>({
    transparent: false,
    theme: "auto",
    setHeaderStyle: () => {},
    resetHeaderStyle: () => {},
});

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [transparent, setTransparent] = useState(false);
    const [theme, setTheme] = useState<HeaderTheme>("auto");

    const setHeaderStyle = useCallback((t: boolean, th: HeaderTheme = "auto") => {
        setTransparent(t);
        setTheme(th);
    }, []);

    const resetHeaderStyle = useCallback(() => {
        setTransparent(false);
        setTheme("auto");
    }, []);

    return (
        <HeaderContext.Provider value={{ transparent, theme, setHeaderStyle, resetHeaderStyle }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);

