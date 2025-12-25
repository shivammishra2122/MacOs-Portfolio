import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    children: React.ReactNode;
    zIndex: number;
    onFocus: (id: string) => void;
}

export const Window = ({ id, title, isOpen, onClose, onMinimize, children, zIndex, onFocus }: WindowProps) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isOpen) return null;

    const mobileStyle = {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 0,
    };

    return (
        <motion.div
            drag={!isMobile}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onMouseDown={() => onFocus(id)}
            style={{ zIndex, ...(isMobile ? mobileStyle : {}) }} // Apply mobile styles directly if needed or rely on className
            className={`absolute bg-[#1e1e1e]/85 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col
        ${isMobile ? 'inset-0 w-full h-full rounded-none' : 'top-20 left-20 w-[800px] h-[500px] rounded-xl'}
      `}
        >
            {/* Title Bar */}
            <div
                className="h-10 bg-white/5 flex items-center justify-between px-4 border-b border-white/10 select-none cursor-default"
            // Double click to maximize?
            >
                {/* Window Controls */}
                <div className="flex space-x-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(id); }}
                        className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                        className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors"
                    >
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors">
                        <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                </div>

                {/* Title */}
                <div className="text-sm font-semibold text-white/80">{title}</div>

                {/* Spacer for centering */}
                <div className="w-14" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto text-white">
                {children}
            </div>
        </motion.div>
    );
};
