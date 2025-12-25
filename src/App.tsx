import React, { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { MenuBar } from './components/layout/MenuBar';
import { Dock } from './components/layout/Dock';
import { WindowManager } from './components/os/WindowManager';
import { Finder } from './apps/Finder';
import { Terminal } from './apps/Terminal';
import { Music } from './apps/Music';

import { StatsWidget } from './components/os/StatsWidget';

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
    { id: 'finder', title: 'Finder', content: <Finder />, isOpen: false, isMinimized: false, zIndex: 0 },
    { id: 'terminal', title: 'Terminal', content: <Terminal />, isOpen: true, isMinimized: false, zIndex: 1 },
    { id: 'safari', title: 'Safari', content: <div className="p-4 bg-white h-full text-black">Safari Content...</div>, isOpen: false, isMinimized: false, zIndex: 0 },
    { id: 'music', title: 'Music', content: <Music />, isOpen: false, isMinimized: false, zIndex: 0 },
  ]);

  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (w.isOpen && !w.isMinimized) {
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

      {/* Main Content Area - Desktop Icons/Widgets Layer */}
      <div className="absolute top-8 left-4 w-64 flex flex-col items-start space-y-4 z-0 pointer-events-auto">
        {/* Stats Widget */}
        <div className="w-full">
          <StatsWidget />
        </div>
      </div>

      {/* Window Layer */}
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
