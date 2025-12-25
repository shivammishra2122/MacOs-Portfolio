import { AnimatePresence } from 'framer-motion';
import { Window } from './Window';
import type { WindowState } from '../../App';

interface WindowManagerProps {
    windows: WindowState[];
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onFocus: (id: string) => void;
}

export const WindowManager = ({ windows, onClose, onMinimize, onFocus }: WindowManagerProps) => {
    return (
        <div className="w-full h-full pointer-events-none">
            <AnimatePresence>
                {windows.map((win) => (
                    !win.isMinimized && win.isOpen && (
                        <div key={win.id} className="pointer-events-auto">
                            <Window
                                id={win.id}
                                title={win.title}
                                isOpen={win.isOpen}
                                onClose={onClose}
                                onMinimize={onMinimize}
                                zIndex={win.zIndex}
                                onFocus={onFocus}
                            >
                                {win.content}
                            </Window>
                        </div>
                    )
                ))}
            </AnimatePresence>
        </div>
    );
};
