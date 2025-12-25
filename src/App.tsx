import React, { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { MenuBar } from './components/layout/MenuBar';
import { Dock } from './components/layout/Dock';
import { WindowManager } from './components/os/WindowManager';
import { Finder } from './apps/Finder';
import { Terminal } from './apps/Terminal';

// Window Definition imports/types could be moved to a shared type file
export interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

function App() {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'finder', title: 'Finder', content: <Finder />, isOpen: true, isMinimized: false, zIndex: 1 },
    { id: 'terminal', title: 'Terminal', content: <Terminal />, isOpen: false, isMinimized: false, zIndex: 0 },
    { id: 'safari', title: 'Safari', content: <div className="p-4 bg-white h-full text-black">Safari Content...</div>, isOpen: false, isMinimized: false, zIndex: 0 },
  ]);

  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isOpen && !w.isMinimized) {
          // If open and focused (top z-index), minimize?
          // Simple behavior: if open, bring to front. If already front, toggle min/max? 
          // MacOS behavior: if open and in dock, click opens/unminimizes/focuses.
          // If already focused, does nothing usually, unless minimized.
          // Let's just unminimize and bring to front.
          return { ...w, isOpen: true, isMinimized: false, zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 };
        }
        return { ...w, isOpen: true, isMinimized: false, zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 };
      }
      return w;
    }));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const bringToFront = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  return (
    <Desktop>
      <MenuBar />

      {/* Main Content Area */}
      <div className="relative w-full h-full pt-8 pb-20 px-4 pointer-events-none">
        {/* WindowManager needs pointer-events-auto on windows */}
        <WindowManager
          windows={windows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={bringToFront}
        />
      </div>

      <Dock onAppClick={toggleWindow} />
    </Desktop>
  );
}

export default App;
