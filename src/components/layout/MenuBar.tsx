import { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';
import { format } from 'date-fns';

export const MenuBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full h-7 bg-white/20 backdrop-blur-md text-white flex items-center justify-between px-2 sm:px-4 z-50 text-sm font-medium shadow-sm border-b border-white/10 select-none">
            {/* Left Area: Apple + Menus */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                <button className="hover:bg-white/20 p-1 rounded transition-colors">
                    <Apple size={18} fill="currentColor" />
                </button>
                <span className="font-bold cursor-default hidden xs:block">Finder</span>
                <div className="hidden md:flex space-x-4 font-normal text-white/90">
                    {['File', 'Edit', 'View', 'Go', 'Window', 'Help'].map((item) => (
                        <button key={item} className="hover:bg-white/20 px-2 rounded -mx-2 transition-colors cursor-default">
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Area: Status Icons + Clock */}
            <div className="flex items-center space-x-2 sm:space-x-3 text-white/90">
                <div className="flex items-center space-x-1 sm:space-x-3 pr-2">
                    <button className="hover:bg-white/20 p-1 rounded hidden sm:block"><Battery size={20} /></button>
                    <button className="hover:bg-white/20 p-1 rounded"><Wifi size={16} /></button>
                    <button className="hover:bg-white/20 p-1 rounded"><Search size={16} /></button>
                    <button className="hover:bg-white/20 p-1 rounded"><SlidersHorizontal size={16} /></button>
                </div>

                <div className="px-2 hover:bg-white/20 rounded cursor-default transition-colors text-xs sm:text-sm">
                    {format(time, 'EEE MMM d HH:mm:ss')}
                </div>
            </div>
        </header>
    );
};
