import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeDesign =
    | 'brutalism'
    | 'neumorphism'
    | 'glassmorphism'
    | 'claymorphism'
    | 'minimalism'
    | 'cyberpunk'
    | 'amoled';

interface ThemeContextType {
    theme: ThemeDesign;
    setTheme: (theme: ThemeDesign) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<ThemeDesign>(() => {
        const saved = localStorage.getItem('sic-theme');
        return (saved as ThemeDesign) || 'glassmorphism';
    });

    const setTheme = (newTheme: ThemeDesign) => {
        setThemeState(newTheme);
        localStorage.setItem('sic-theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
