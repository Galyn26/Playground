// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Rocket, Home, LayoutGrid, Globe, Building2 } from 'lucide-react';
import ThreeDScene from './ThreeDScene';

export const PlayerContext = React.createContext();
export const MOCK_SHOPS = [
  { id: '1', name: 'Gemini AI Lab', url: 'https://gemini.google.com/', color: 'bg-indigo-500', icon: Rocket },
  { id: '2', name: 'The Docs Archive', url: 'https://developers.google.com/docs', color: 'bg-green-500', icon: LayoutGrid },
  { id: '3', name: 'The Video Factory', url: 'https://www.youtube.com/', color: 'bg-red-500', icon: Globe },
  { id: '4', name: 'Cloud City HQ', url: 'https://cloud.google.com/', color: 'bg-blue-500', icon: Building2 },
];

const usePlayerMovement = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, z: 0 });

  const movePlayer = (dx, dz) => {
    setPlayerPos(prev => {
      const newX = Math.min(250, Math.max(-250, prev.x + dx));
      const newZ = Math.min(250, Math.max(-250, prev.z + dz));
      return { x: newX, z: newZ };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const speed = 20;
      let dx = 0, dz = 0;
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') dz = speed;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') dz = -speed;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') dx = speed;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') dx = -speed;

      if (dx !== 0 || dz !== 0) movePlayer(dx, dz);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { playerPos, movePlayer };
};

const UIOverlay = ({ onNavigate, userId, playerPos }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
      onNavigate(searchUrl);
      setSearchText('');
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 z-50 pointer-events-none">
      <div className="flex justify-between items-start">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-lg pointer-events-auto bg-gray-800/80 backdrop-blur-sm p-2 rounded-full shadow-xl border border-indigo-400/50"
        >
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search the Internet City (e.g., 'gemini news')"
            className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none px-3"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors active:scale-95 shadow-md"
            title="Search"
          >
            <Search size={20} />
          </button>
        </form>

        <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-pink-400/50 text-white text-sm font-mono flex flex-col items-end">
          <p className="flex items-center gap-1 mb-1"><Rocket size={16} className="text-pink-400"/> Pos: $({Math.round(playerPos.x)}, {Math.round(playerPos.z)})$</p>
          <p className="flex items-center gap-1"><Home size={16} className="text-pink-400"/> User ID: {userId.substring(0, 8)}...</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none text-white text-xs bg-gray-900/50 backdrop-blur-sm p-2 px-4 rounded-lg shadow-lg opacity-70">
        Use **W/A/S/D** or **Arrow Keys** to explore the city.
      </div>
    </div>
  );
};

const WebView = ({ url, onReturn }) => (
  <div className="absolute inset-0 bg-gray-900 z-40">
    <iframe
      src={url}
      title="Web View"
      className="w-full h-full border-none"
      allow="geolocation; microphone; camera"
    />
    <button
      onClick={onReturn}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-full shadow-2xl transition-all duration-300 active:scale-90 border-4 border-white z-[100] flex items-center justify-center pointer-events-auto"
      title="🏠 Return to Playground"
    >
      <Home size={32} className="text-yellow-300"/>
    </button>
  </div>
);

export default function App() {
  const [view, setView] = useState({ type: '3D', url: null });
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const playerControls = usePlayerMovement();

  const navigateToUrl = useCallback((url) => setView({ type: 'WEBVIEW', url }), []);
  const returnToPlayground = useCallback(() => setView({ type: '3D', url: null }), []);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      <p className="mt-4 text-xl">Entering Playground...</p>
    </div>
  );

  return (
    <PlayerContext.Provider value={playerControls}>
      <div className="w-full h-screen relative font-sans overflow-hidden">
        {view.type === '3D' && <ThreeDScene onNavigate={navigateToUrl} />}
        <UIOverlay onNavigate={navigateToUrl} userId={userId} playerPos={playerControls.playerPos} />
        {view.type === 'WEBVIEW' && view.url && <WebView url={view.url} onReturn={returnToPlayground} />}
      </div>
    </PlayerContext.Provider>
  );
}

