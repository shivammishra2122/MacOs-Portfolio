import type { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    color?: string;
}

export const DesktopIcon = ({ icon: Icon, label, onClick, color = "text-blue-500" }: DesktopIconProps) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center space-y-1 p-2 rounded-md hover:bg-white/20 transition-colors group w-24"
        >
            <div className={`p-3 bg-white/90 rounded-2xl shadow-lg ${color}`}>
                <Icon size={32} />
            </div>
            <span className="text-white text-xs font-medium shadow-sm drop-shadow-md text-center leading-tight">
                {label}
            </span>
        </button>
    );
};
