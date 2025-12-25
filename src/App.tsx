import React, { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { MenuBar } from './components/layout/MenuBar';
import { Dock } from './components/layout/Dock';
import { WindowManager } from './components/os/WindowManager';
import { Finder } from './apps/Finder';
import { Terminal } from './apps/Terminal';
import { Music } from './apps/Music';
import { DesktopIcon } from './components/os/DesktopIcon';
import { Folder, HardDrive, Smartphone } from 'lucide-react';

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

  const openFinderSection = (section: string) => {
    // Check if Finder is already open
    setWindows(prev => {
      const finder = prev.find(w => w.id === 'finder');
      const maxZ = Math.max(...prev.map(p => p.zIndex));

      if (finder) {
        // If finder exists, we need to update its content to point to the section
        // For now, simpler approach: Just open it. To deep link, we might need to change how we store content or pass props dynamically.
        // Let's replace the content with a new Finder instance with the correct initialSection.
        return prev.map(w => w.id === 'finder' ?
          { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1, content: <Finder initialSection={section} /> }
          : w);
      }
      return prev;
    });
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

      {/* Main Content Area - Desktop Icons Layer */}
      <div className="absolute top-8 right-0 bottom-20 w-32 flex flex-col items-center p-4 space-y-4 z-0 pointer-events-auto">
        <DesktopIcon
          icon={HardDrive}
          label="Macintosh HD"
          onClick={() => toggleWindow('finder')}
          color="text-gray-400"
        />
        <DesktopIcon
          icon={Folder}
          label="Projects"
          onClick={() => openFinderSection('Projects')}
          color="text-blue-500"
        />
        <DesktopIcon
          icon={Folder}
          label="Experience"
          onClick={() => openFinderSection('Exp.')}
          color="text-blue-500"
        />
        <DesktopIcon
          icon={Smartphone}
          label="Shivam's iPhone"
          onClick={() => toggleWindow('music')}
          color="text-gray-800"
        />
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
