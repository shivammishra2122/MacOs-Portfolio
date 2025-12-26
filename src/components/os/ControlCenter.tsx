import { useTheme, wallpapers, type WallpaperId } from '../../context/ThemeContext';
import { Sun, Moon, Volume2, Wifi, Bluetooth } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ControlCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ControlCenter = ({ isOpen }: ControlCenterProps) => {
    const { mode, toggleMode, wallpaper, setWallpaper } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-10 right-4 w-80 bg-white/20 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-4 z-50 text-black dark:text-white"
                >
                    <div className="flex gap-4 mb-4">
                        {/* Status Toggles Block */}
                        <div className="flex-1 bg-white/50 dark:bg-black/50 rounded-xl p-3 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500 rounded-full text-white">
                                    <Wifi size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Wi-Fi</span>
                                    <span className="text-[10px] opacity-70">Home Network</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500 rounded-full text-white">
                                    <Bluetooth size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Bluetooth</span>
                                    <span className="text-[10px] opacity-70">On</span>
                                </div>
                            </div>
                        </div>

                        {/* Theme Toggle Block */}
                        <div className="flex-1 bg-white/50 dark:bg-black/50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-white/60 dark:hover:bg-black/60" onClick={toggleMode}>
                            <div className={`p-3 rounded-full ${mode === 'dark' ? 'bg-white text-black' : 'bg-yellow-400 text-white'}`}>
                                {mode === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <span className="text-xs font-medium">{mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                        </div>
                    </div>

                    {/* Wallpaper Picker */}
                    <div className="bg-white/50 dark:bg-black/50 rounded-xl p-3">
                        <h4 className="text-xs font-semibold mb-3 opacity-80 uppercase tracking-wider">Wallpapers</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.keys(wallpapers).map((id) => (
                                <button
                                    key={id}
                                    onClick={() => setWallpaper(id as WallpaperId)}
                                    className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${wallpaper === id ? 'border-blue-500 scale-105' : 'border-transparent hover:scale-105'}`}
                                >
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: wallpapers[id as WallpaperId] }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Volume Slider Mock */}
                    <div className="mt-4 bg-white/50 dark:bg-black/50 rounded-xl p-3">
                        <div className="flex items-center gap-3">
                            <Volume2 size={16} className="text-gray-500 dark:text-gray-400" />
                            <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div className="w-3/4 h-full bg-blue-500" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
