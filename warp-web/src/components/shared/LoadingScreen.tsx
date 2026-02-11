import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("INITIALIZING WARP PROTOCOL...");

    const loadingTexts = [
        "LOADING ASSETS...",
        "ESTABLISHING SECURE CONNECTION...",
        "VERIFYING INTEGRITY...",
        "SYNCING WITH MAINNET...",
        "DECRYPTING DATA STREAMS...",
        "ALLOCATING RESOURCES...",
        "OPTIMIZING ROUTES...",
        "CALIBRATING SENSORS...",
    ];

    useEffect(() => {
        // Total duration of the loading screen
        const totalDuration = 2000;
        // Update interval
        const intervalTime = 50;
        const steps = totalDuration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min(100, Math.round((currentStep / steps) * 100));
            setProgress(newProgress);

            // Randomly change text every ~10% progress
            if (newProgress % 10 === 0 && newProgress < 90) {
                setText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
            }

            if (currentStep >= steps) {
                clearInterval(timer);
                // Small delay before unmounting
                setTimeout(onComplete, 200);
            }
        }, intervalTime);

        // Cleanup on unmount
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono cursor-wait bg-warp-white text-warp-black">

            {/* Background Grid Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `linear-gradient(theme('colors.warp.black') 1px, transparent 1px), linear-gradient(90deg, theme('colors.warp.black') 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative w-full max-w-md p-8 border-2 border-warp-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                {/* Decorative corner markers */}
                <div className="absolute top-0 left-0 w-4 h-4 -mt-1 -ml-1 border-t-4 border-l-4 border-warp-red"></div>
                <div className="absolute top-0 right-0 w-4 h-4 -mt-1 -mr-1 border-t-4 border-r-4 border-warp-red"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 -mb-1 -ml-1 border-b-4 border-l-4 border-warp-red"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 -mb-1 -mr-1 border-b-4 border-r-4 border-warp-red"></div>

                <h1 className="mb-8 text-5xl font-black text-center glitch-text tracking-tighter italic">
                    <span className="bg-warp-yellow px-2 border-2 border-warp-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">
                        W.A.R.P.
                    </span>
                </h1>

                <div className="flex justify-between mb-4 text-xs font-bold uppercase tracking-widest">
                    <span>System Status:</span>
                    <span className="animate-pulse text-warp-black bg-warp-yellow border border-warp-black px-2 font-bold">ONLINE</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-6 p-1 mb-4 border-2 border-warp-black bg-warp-grey/50">
                    <div
                        className="h-full transition-all duration-75 ease-out bg-warp-yellow border-r-2 border-warp-black"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="text-sm font-bold truncate max-w-[70%] text-warp-black/80">
                        {">"} {text}<span className="animate-pulse">_</span>
                    </div>
                    <div className="text-2xl font-black">
                        {progress}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
