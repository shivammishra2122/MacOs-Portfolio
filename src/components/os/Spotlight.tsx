import { useState, useEffect, useRef } from 'react';
import { Search, Calculator, Folder, Globe, Terminal, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpotlightProps {
    isOpen: boolean;
    onClose: () => void;
    onLaunchApp: (id: string) => void;
}

const mockResults = [
    { id: 'finder', title: 'Finder', icon: Folder, type: 'Application' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, type: 'Application' },
    { id: 'safari', title: 'Safari', icon: Globe, type: 'Application' },
    { id: 'music', title: 'Music', icon: Music, type: 'Application' },
    { id: 'calc', title: 'Calculator', icon: Calculator, type: 'Application' },
    { id: 'resume', title: 'Resume.pdf', icon: Folder, type: 'File' },
];

export const Spotlight = ({ isOpen, onClose }: SpotlightProps) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const filteredResults = query === ''
        ? []
        : mockResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] z-[70]"
                    >
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                            {/* Input Area */}
                            <div className="flex items-center px-4 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                                <Search className="text-gray-500 w-6 h-6 mr-3" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    // Removed local onKeyDown since global handles it
                                    placeholder="Spotlight Search"
                                    className="flex-1 bg-transparent text-2xl outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 font-light"
                                />
                                {/* Close Button logic */}
                                {query ? (
                                    <button onClick={() => setQuery('')} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full">
                                        <span className="text-xs font-bold text-gray-500">Clear</span>
                                    </button>
                                ) : (
                                    <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                                        <div className="text-gray-400 text-xs uppercase font-semibold tracking-wider">ESC</div>
                                    </button>
                                )}
                            </div>

                            {/* Results Area */}
                            {query && (
                                <div className="max-h-[400px] overflow-y-auto p-2">
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((result, index) => (
                                            <div
                                                key={result.id}
                                                onClick={() => {
                                                    onLaunchApp(result.id);
                                                    onClose();
                                                }}
                                                className={`flex items-center px-4 py-2 rounded-lg cursor-default ${index === 0 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-800 dark:text-gray-200'}`}
                                            >
                                                <result.icon size={20} className="mr-3" />
                                                <div className="flex flex-col">
                                                    <span className="text-base font-medium">{result.title}</span>
                                                    {index === 0 && <span className="text-xs opacity-80">{result.type}</span>}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
