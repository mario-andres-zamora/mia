import { useEffect, useRef } from 'react';

export default function YouTubePlayer({ id, videoId, onEnded, ytApiLoaded, isWatched }) {
    const playerRef = useRef(null);
    const lastTimeRef = useRef(0);

    useEffect(() => {
        if (!ytApiLoaded || !videoId) return;

        let player;
        let interval;
        
        const initPlayer = () => {
            player = new window.YT.Player(`yt-player-${id}`, {
                videoId: videoId,
                width: '100%',
                height: '100%',
                playerVars: {
                    'rel': 0,
                    'modestbranding': 1,
                    'controls': isWatched ? 1 : 1 // We keep controls but monitor seeking
                },
                events: {
                    'onStateChange': (event) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            const duration = player.getDuration();
                            // Only mark as watched if they actually reached the end legitimately (or if it was already watched)
                            // We allow a small margin (3 seconds) for duration differences
                            if (isWatched || lastTimeRef.current >= duration - 3) {
                                onEnded();
                            } else {
                                // User skipped to the end illegally
                                player.seekTo(lastTimeRef.current);
                                player.playVideo();
                            }
                        }
                    }
                }
            });
            playerRef.current = player;

            // Monitor seeking forward
            if (!isWatched) {
                interval = setInterval(() => {
                    if (player && player.getCurrentTime) {
                        const currentTime = player.getCurrentTime();
                        // If they skip ahead more than 2 seconds from the last recorded max time
                        if (currentTime > lastTimeRef.current + 2) {
                            player.seekTo(lastTimeRef.current);
                        } else {
                            if (currentTime > lastTimeRef.current) {
                                lastTimeRef.current = currentTime;
                            }
                        }
                    }
                }, 1000);
            }
        };

        // Small delay to ensure container is ready in DOM
        const timer = setTimeout(initPlayer, 100);
        return () => {
            clearTimeout(timer);
            if (interval) clearInterval(interval);
            if (player && player.destroy) player.destroy();
        };
    }, [videoId, ytApiLoaded, id, onEnded, isWatched]);

    return (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <div id={`yt-player-${id}`} className="w-full h-full"></div>
            {!ytApiLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm transition-all animate-pulse">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Cargando YouTube...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
