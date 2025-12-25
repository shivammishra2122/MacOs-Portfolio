import { Music as MusicIcon, Play, SkipBack, SkipForward, Pause } from 'lucide-react';
import { useState } from 'react';

export const Music = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="h-full w-full bg-white flex flex-col items-center justify-center text-black">
            <div className="w-64 bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-200">
                {/* Album Art Placeholder */}
                <div className="w-full aspect-square bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-inner mb-6 flex items-center justify-center">
                    <MusicIcon size={48} className="text-white opacity-50" />
                </div>

                {/* Song Info */}
                <div className="text-center mb-6">
                    <h3 className="font-bold text-lg text-gray-800">My Resume Mix</h3>
                    <p className="text-gray-500 text-sm">Shivam Mishra</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <SkipBack size={24} fill="currentColor" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <SkipForward size={24} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};
