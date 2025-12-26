import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

export const wallpapers = {
    'default': 'url("https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")', // Abstract shapes (resembles Monterey)
    'sonoma': 'url("https://images.unsplash.com/photo-1696426721590-77a8afdc7034?q=80&w=2070&auto=format&fit=crop")', // Abstract Gradient 
    'ventura': 'url("https://images.unsplash.com/photo-1662423714241-118c867b366a?q=80&w=2070&auto=format&fit=crop")', // Abstract Orange
    'monterey': 'url("https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")', // Mountain Landscape
};

export type WallpaperId = keyof typeof wallpapers;

interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
    wallpaper: WallpaperId;
    setWallpaper: (id: WallpaperId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme-mode');
        return (saved as ThemeMode) || 'light';
    });

    const [wallpaper, setWallpaperState] = useState<WallpaperId>(() => {
        return (localStorage.getItem('theme-wallpaper') as WallpaperId) || 'default';
    });

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('theme-wallpaper', wallpaper);
    }, [wallpaper]);

    const toggleMode = () => {
        setMode(prev => prev === 'light' ? 'dark' : 'light');
    };

    const setWallpaper = (id: WallpaperId) => {
        setWallpaperState(id);
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, wallpaper, setWallpaper }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
