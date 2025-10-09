import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Mandatory Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, getDoc, setLogLevel } from 'firebase/firestore';

// --- Icons (using lucide-react) ---
import { Search, Globe, Rocket, Home, LayoutGrid, ArrowLeft, Building2 } from 'lucide-react';

// --- Configuration and Mock Data ---
const MOCK_SHOPS = [
    { id: '1', name: 'Gemini AI Lab', url: 'https://gemini.google.com/', color: 'bg-indigo-500', icon: Rocket },
    { id: '2', name: 'The Docs Archive', url: 'https://developers.google.com/docs', color: 'bg-green-500', icon: LayoutGrid },
    { id: '3', name: 'The Video Factory', url: 'https://www.youtube.com/', color: 'bg-red-500', icon: Globe },
    { id: '4', name: 'Cloud City HQ', url: 'https://cloud.google.com/', color: 'bg-blue-500', icon: Building2 },
];

const INITIAL_VIEW = { type: '3D', url: null };

// --- Player Position & Movement Simulation ---
const PlayerContext = React.createContext();

const usePlayerMovement = () => {
    const [playerPos, setPlayerPos] = useState({ x: 0, z: 0 });

    const movePlayer = (dx, dz) => {
        setPlayerPos(prev => {
            // Simple bounding box logic (e.g., world size 500x500)
            const newX = Math.min(250, Math.max(-250, prev.x + dx));
            const newZ = Math.min(250, Math.max(-250, prev.z + dz));
            return { x: newX, z: newZ };
        });
    };

    // Keyboard controls simulation
    useEffect(() => {
        const handleKeyDown = (e) => {
            const speed = 20; // Movement speed
            let dx = 0, dz = 0;
            if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') dz = speed;
            if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') dz = -speed;
            if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') dx = speed;
            if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') dx = -speed;

            if (dx !== 0 || dz !== 0) {
                movePlayer(dx, dz);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return { playerPos, movePlayer };
};


// --- Components ---

// Component: Shop (A clickable 3D object representation)
const Shop = ({ shop, playerPos, onNavigate }) => {
    // Simulate shop position in 3D space (using absolute positioning in 2D)
    // The shop is positioned relative to the center of the viewport
    // The player's position is subtracted to simulate camera movement
    const shopX = (shop.id * 100) - 200; // Mock positions: -100, 0, 100, 200
    const shopZ = 50;

    const style = {
        transform: `translate3d(
            ${shopX - playerPos.x}px,
            ${shopZ - playerPos.z}px,
            0
        ) scale(${1 - Math.abs(shopX - playerPos.x) / 500})`, // Simple perspective scale
        transition: 'transform 0.1s linear',
    };

    const ShopIcon = shop.icon;

    return (
        <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-2xl transition-all duration-300 transform-gpu cursor-pointer hover:scale-110 active:scale-95 ${shop.color} text-white flex flex-col items-center justify-center`}
            style={style}
            onClick={() => onNavigate(shop.url)}
            title={`Click to enter ${shop.name}`}
        >
            <div className="p-3 bg-white/20 rounded-lg mb-2">
                <ShopIcon size={32} />
            </div>
            <p className="font-bold text-lg whitespace-nowrap">{shop.name}</p>
        </div>
    );
};

// Component: ThreeDWorldSimulation (The main game environment)
const ThreeDWorldSimulation = ({ onNavigate }) => {
    const { playerPos } = React.useContext(PlayerContext);
    const { x, z } = playerPos;

    return (
        <div className="absolute inset-0 overflow-hidden bg-gray-900 perspective-1000">
            {/* World Sky/Horizon simulation */}
            <div className="absolute inset-0 opacity-80" style={{
                background: 'linear-gradient(180deg, #100b2f 0%, #1d1840 50%, #4a2c5a 100%)',
            }}></div>

            {/* Simulated Ground Plane (Grid) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{
                transform: 'rotateX(75deg) translateY(200px)',
                background: 'repeating-conic-gradient(#2c2447 0% 25%, #1d1833 0% 50%) 0 / 100px 100px',
                backgroundSize: '100px 100px',
                transformOrigin: '50% 100%',
                // Grid movement based on player position
                backgroundPosition: `${-x / 5}px ${z / 5}px`
            }}></div>

            {/* Simulated World Elements (Shops) */}
            {MOCK_SHOPS.map(shop => (
                <Shop
                    key={shop.id}
                    shop={shop}
                    playerPos={playerPos}
                    onNavigate={onNavigate}
                />
            ))}

            {/* Player Indicator (always centered) */}
            <div
                className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-yellow-300 shadow-neon border-4 border-yellow-100 z-50 animate-pulse"
                style={{ transform: 'translate(-50%, -50%)' }}
            ></div>
        </div>
    );
};

// Component: UIOverlay (Search bar and HUD)
const UIOverlay = ({ onNavigate, userId }) => {
    const { playerPos } = React.useContext(PlayerContext);
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            // Simulate Google Search functionality
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
            onNavigate(searchUrl);
            setSearchText('');
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0 p-4 z-50 pointer-events-none">
            {/* Top Bar: Search and Stats */}
            <div className="flex justify-between items-start">
                {/* Search Bar (Pointer Events ON) */}
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

                {/* Player HUD (Pointer Events OFF) */}
                <div className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-pink-400/50 text-white text-sm font-mono flex flex-col items-end">
                    <p className="flex items-center gap-1 mb-1"><Rocket size={16} className="text-pink-400"/> Pos: $({Math.round(playerPos.x)}, {Math.round(playerPos.z)})$</p>
                    <p className="flex items-center gap-1"><Home size={16} className="text-pink-400"/> User ID: {userId.substring(0, 8)}...</p>
                </div>
            </div>

            {/* Movement Controls Hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none text-white text-xs bg-gray-900/50 backdrop-blur-sm p-2 px-4 rounded-lg shadow-lg opacity-70">
                Use **W/A/S/D** or **Arrow Keys** to explore the city.
            </div>
        </div>
    );
};

// Component: ReturnButton (The Playground Portal Icon)
const ReturnButton = ({ onReturn }) => {
    return (
        <button
            onClick={onReturn}
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white w-16 h-16 rounded-full shadow-2xl transition-all duration-300 active:scale-90 border-4 border-white z-[100] flex items-center justify-center pointer-events-auto"
            title="🏠 Return to Playground"
        >
            <Home size={32} className="text-yellow-300"/>
        </button>
    );
}

// Component: WebView (Displays the 2D site inside the app)
const WebView = ({ url, onReturn }) => {
    return (
        <div className="absolute inset-0 bg-gray-900 z-40">
            <iframe
                src={url}
                title="Web View"
                className="w-full h-full border-none"
                allow="geolocation; microphone; camera"
            />
            {/* The Playground Portal Icon */}
            <ReturnButton onReturn={onReturn} />
        </div>
    );
};

// Component: App (Main container and state manager)
export default function App() {
    const [view, setView] = useState(INITIAL_VIEW);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const playerControls = usePlayerMovement();

    const navigateToUrl = useCallback((url) => {
        // In a real app, this would open the iframe/webview component
        console.log(`Navigating to: ${url}`);
        setView({ type: 'WEBVIEW', url });
    }, []);

    const returnToPlayground = useCallback(() => {
        console.log("Returning to 3D Playground...");
        setView(INITIAL_VIEW);
    }, []);

    // --- Mandatory Firebase/Auth Setup ---
    useEffect(() => {
        const initFirebase = async () => {
            try {
                // Safely access global variables, defaulting to null if running locally
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
                const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                
                // If you are running this locally, REPLACE the null in the line below 
                // with your actual Firebase config object to enable storage features.
                // Example: const LOCAL_FIREBASE_CONFIG = { apiKey: "...", authDomain: "..." };
                const LOCAL_FIREBASE_CONFIG = null; 

                const finalConfig = firebaseConfig || LOCAL_FIREBASE_CONFIG;
                
                if (!finalConfig) {
                    console.warn("Firebase config is missing. Running in non-persistent demo mode.");
                    // Generate a temporary ID so the app can still run
                    setUserId(crypto.randomUUID());
                    setIsLoading(false);
                    return;
                }
                
                setLogLevel('Debug');
                const app = initializeApp(finalConfig);
                const auth = getAuth(app);
                const db = getFirestore(app);

                const authPromise = new Promise((resolve) => {
                    onAuthStateChanged(auth, async (user) => {
                        if (!user) {
                            // Sign in anonymously if no user is found
                            try {
                                if (initialAuthToken) {
                                    const userCredential = await signInWithCustomToken(auth, initialAuthToken);
                                    setUserId(userCredential.user.uid);
                                } else {
                                    const userCredential = await signInAnonymously(auth);
                                    setUserId(userCredential.user.uid);
                                }
                            } catch (e) {
                                console.error("Firebase Auth error:", e);
                                setUserId(`ERROR_${crypto.randomUUID().substring(0, 8)}`);
                            }
                        } else {
                            setUserId(user.uid);
                        }
                        resolve();
                    });
                });

                await authPromise;
                // Once authenticated/ready, you can start fetching data (Phase 3)
                console.log(`Firebase Initialized. User ID: ${userId}`);

            } catch (error) {
                console.error("Critical Firebase initialization error:", error);
                setUserId('INIT_FAIL');
            } finally {
                setIsLoading(false);
            }
        };

        initFirebase();
    }, []);


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
                <p className="mt-4 text-xl">Entering Playground...</p>
            </div>
        );
    }

    return (
        <PlayerContext.Provider value={playerControls}>
            <div className="w-full h-screen relative font-sans overflow-hidden">
                {/* Always render the 3D simulation layer beneath the overlay */}
                <ThreeDWorldSimulation onNavigate={navigateToUrl} />
                <UIOverlay onNavigate={navigateToUrl} userId={userId} />

                {/* Conditional Rendering for Web View */}
                {view.type === 'WEBVIEW' && view.url && (
                    <WebView
                        url={view.url}
                        onReturn={returnToPlayground}
                    />
                )}
            </div>
        </PlayerContext.Provider>
    );
}

