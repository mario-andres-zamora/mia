import React from 'react';
import { PlayCircle, CheckCircle, Clock, Eye, Award } from 'lucide-react';
import YouTubePlayer from '../YouTubePlayer';

export default function VideoActivity({ item, data, watchedVideos, markVideoAsWatched, ytApiLoaded, lastTimeRef, API_URL }) {
    const isWatched = watchedVideos.has(item.id);
    const isYT = !!data.url?.includes('youtube.com') || !!data.url?.includes('youtu.be');
    const ytId = isYT ? (data.url.split('v=')[1]?.split('&')[0] || data.url.split('/').pop()) : null;
    const videoSrc = data.file_url ? `${API_URL.replace('/api', '')}${data.file_url}` : null;

    return (
        <div className={`space-y-4 p-4 rounded-3xl transition-all duration-700 ${isWatched ? 'bg-green-500/5 border border-green-500/20 shadow-lg shadow-green-500/10' : 'bg-slate-800/10 border border-white/5'}`}>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5 ring-1 ring-white/10 group">
                {isYT ? (
                    <YouTubePlayer
                        id={item.id}
                        videoId={ytId}
                        ytApiLoaded={ytApiLoaded}
                        onEnded={() => markVideoAsWatched(item.id)}
                        isWatched={isWatched}
                        isRequired={item.is_required}
                    />
                ) : videoSrc ? (
                    <video
                        src={videoSrc}
                        className="w-full h-full"
                        controls
                        onEnded={(e) => {
                            if (isWatched || lastTimeRef.current >= e.target.duration - 3) {
                                markVideoAsWatched(item.id);
                            } else {
                                e.target.currentTime = lastTimeRef.current;
                                e.target.play();
                            }
                        }}
                        onTimeUpdate={(e) => {
                            if (!isWatched && !e.target.seeking) {
                                if (e.target.currentTime > lastTimeRef.current) {
                                    lastTimeRef.current = e.target.currentTime;
                                }
                            }
                        }}
                        onSeeking={(e) => {
                            if (item.is_required && !isWatched && e.target.currentTime > lastTimeRef.current + 1) {
                                e.target.currentTime = lastTimeRef.current;
                            }
                        }}
                        controlsList="nodownload"
                    ></video>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-slate-900">
                        <PlayCircle className="w-20 h-20 text-gray-700" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Video no disponible</p>
                    </div>
                )}

                {isWatched && (
                    <div className="absolute top-4 right-4 z-10 animate-fade-in">
                        <div className="bg-green-500 text-white p-2.5 rounded-2xl shadow-xl shadow-green-500/40 border-2 border-green-400 scale-110 drop-shadow-lg">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center px-2">
                <div className="flex flex-col gap-2">
                    <h3 className={`text-lg font-bold flex items-center gap-3 transition-all duration-500 ${isWatched ? 'text-green-400' : 'text-white'}`}>
                        <div className={`p-2.5 rounded-xl transition-all duration-500 ${isWatched ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-blue-500/20 text-blue-400'}`}>
                            <PlayCircle className="w-5 h-5" />
                        </div>
                        {item.title}
                    </h3>

                    <div className="flex items-center gap-2">
                        {!!item.is_required && !isWatched && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                                <Clock className="w-3.5 h-3.5" /> Requerido
                            </span>
                        )}

                        {isWatched ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/30 animate-fade-in">
                                <CheckCircle className="w-3.5 h-3.5" /> ¡Video Completado!
                            </span>
                        ) : (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${item.is_required ? 'bg-white/5 text-gray-500 border-white/5' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                <Eye className="w-3.5 h-3.5" /> {item.is_required ? 'Pendiente' : 'Opcional'}
                            </span>
                        )}
                    </div>
                </div>

                {item.points > 0 && (
                    <div className="flex flex-col items-end gap-1.5">
                        <div className={`relative px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-500 transform ${isWatched ? 'bg-yellow-500 text-slate-950 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                            +{item.points} PTS
                            {isWatched && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                            )}
                        </div>
                        {isWatched && (
                            <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest animate-pulse flex items-center gap-1">
                                <Award className="w-3 h-3" /> ¡Ganados!
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
