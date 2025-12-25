import { Wallpaper } from './Wallpaper';

interface DesktopProps {
    children?: React.ReactNode;
}

export const Desktop = ({ children }: DesktopProps) => {
    return (
        <main className="relative w-screen h-screen overflow-hidden select-none">
            <Wallpaper />

            {/* Desktop Content Layer */}
            <div className="relative z-0 w-full h-full">
                {children}
            </div>

            {/* Overlay Layer (for modals/menus if needed globally) */}
        </main>
    );
};
