import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../utils';

interface ProductVideoProps {
  webmUrl?: string;
  mp4Url?: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}

const ProductVideo: React.FC<ProductVideoProps> = ({ 
  webmUrl, 
  mp4Url, 
  poster, 
  className,
  autoPlay = true 
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!webmUrl && !mp4Url) return null;

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={cn("relative w-full h-full group/video overflow-hidden rounded-[3rem] bg-black", className)}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ pointerEvents: 'auto' }}
      >
        {webmUrl && <source src={webmUrl} type="video/webm" />}
        {mp4Url && <source src={mp4Url} type="video/mp4" />}
        Tu navegador no soporta videos.
      </video>
      
      {/* Overlay aesthetic gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Mute/Unmute Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white/30 transition-all active:scale-95 shadow-lg group/mute"
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? (
          <div className="flex items-center gap-2">
            <VolumeX className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest pr-1">Activar Sonido</span>
          </div>
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Visual indicator of video (Optional for manual play) */}
      {!autoPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity opacity-100 group-hover/video:opacity-0 pointer-events-none">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl">
            <Play className="w-10 h-10 text-white fill-current translate-x-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVideo;
