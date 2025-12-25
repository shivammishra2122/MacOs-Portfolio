import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Terminal, AppWindow, Globe, FileText, Folder } from 'lucide-react';

// Dock config
const apps = [
    { id: 'finder', title: 'Finder', icon: Folder, color: 'text-blue-500' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, color: 'text-gray-800' },
    { id: 'safari', title: 'Safari', icon: Globe, color: 'text-blue-400' },
    { id: 'preview', title: 'Preview', icon: FileText, color: 'text-red-500' },
    { id: 'mail', title: 'Mail', icon: AppWindow, color: 'text-blue-600' },
];

interface DockProps {
    onAppClick: (id: string) => void;
}

export const Dock = ({ onAppClick }: DockProps) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-full px-2 sm:w-auto">
            <div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end h-16 gap-2 sm:gap-4 px-2 sm:px-4 pb-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl mx-auto w-fit overflow-x-auto overflow-y-hidden"
            >
                {apps.map((app) => (
                    <DockIcon
                        key={app.id}
                        mouseX={mouseX}
                        icon={app.icon}
                        color={app.color}
                        onClick={() => onAppClick(app.id)}
                    />
                ))}
            </div>
        </div>
    );
};

function DockIcon({ mouseX, icon: Icon, color, onClick }: { mouseX: MotionValue, icon: any, color: string, onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            onClick={onClick}
            className="aspect-square rounded-xl bg-white shadow-lg flex items-center justify-center cursor-pointer mb-2 hover:bg-white/90 transition-colors shrink-0 min-w-[40px]"
            whileTap={{ scale: 0.8 }}
        >
            <Icon size="50%" className={color} />
        </motion.div>
    );
}
