import { motion } from 'framer-motion';
import { Terminal, AppWindow, Globe, FileText, Folder } from 'lucide-react';

// Dock config
const apps = [
    { id: 'finder', title: 'Finder', icon: Folder, color: 'text-blue-500' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-gray-800 dark:text-gray-100' },
    { id: 'safari', title: 'Safari', icon: Globe, color: 'text-blue-400' },
    { id: 'preview', title: 'Preview', icon: FileText, color: 'text-red-500' },
    { id: 'mail', title: 'Mail', icon: AppWindow, color: 'text-blue-600' },
];

interface DockProps {
    onAppClick: (id: string) => void;
}

export const Dock = ({ onAppClick }: DockProps) => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-full px-2 sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-4 px-3 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl mx-auto w-fit overflow-x-auto">
                {apps.map((app) => (
                    <DockIcon
                        key={app.id}
                        icon={app.icon}
                        color={app.color}
                        onClick={() => onAppClick(app.id)}
                    />
                ))}
            </div>
        </div>
    );
};

function DockIcon({ icon: Icon, color, onClick }: { icon: any, color: string, onClick: () => void }) {
    return (
        <motion.div
            onClick={onClick}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-zinc-800 shadow-lg flex items-center justify-center cursor-pointer hover:bg-white/90 dark:hover:bg-zinc-700 transition-colors shrink-0"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
        >
            <Icon size="50%" className={color} />
        </motion.div>
    );
}
