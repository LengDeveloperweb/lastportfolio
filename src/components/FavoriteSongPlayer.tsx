import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  RotateCcw,
  RotateCw,
  Repeat,
  ChevronDown,
  ChevronUp,
  Music,
  Heart,
  Disc3,
  Download
} from 'lucide-react';

interface FavoriteSongPlayerProps {
  onStateChange?: (isPlaying: boolean) => void;
}

export const FavoriteSongPlayer: React.FC<FavoriteSongPlayerProps> = ({ onStateChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const MP3_SRC = '/champei-siem-reap.mp3';

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        onStateChange?.(false);
      }
    };

    const handlePlayEvent = () => {
      setIsPlaying(true);
      onStateChange?.(true);
    };

    const handlePauseEvent = () => {
      setIsPlaying(false);
      onStateChange?.(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, [isLooping, onStateChange, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.warn('Playback error:', err);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      audioRef.current.muted = vol === 0;
      setIsMuted(vol === 0);
    }
  };

  const skipTime = (offset: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.min(Math.max(0, audio.currentTime + offset), duration || 1000);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleLoop = () => {
    const next = !isLooping;
    setIsLooping(next);
    if (audioRef.current) {
      audioRef.current.loop = next;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      aria-label="Favorite MP3 Music Player"
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100vw-2rem)] sm:max-w-md transition-all duration-300"
    >
      {/* HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={MP3_SRC}
        preload="metadata"
        loop={isLooping}
      />

      {isExpanded ? (
        /* Expanded Player Card with Turntable, Scrubber, & Full Controls */
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] p-5 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.95)] shadow-cyan-950/40 text-white relative select-none">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Heart className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 animate-pulse" />
              <span className="font-semibold tracking-wider text-[11px] uppercase">
                Favorite Song · MP3
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                128 kbps
              </span>

              {/* Download MP3 */}
              <a
                href={MP3_SRC}
                download="Champei-Siem-Reap-Sin-Sisamuth.mp3"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Download MP3"
                aria-label="Download MP3"
              >
                <Download className="w-3.5 h-3.5" />
              </a>

              {/* Minimize */}
              <button
                onClick={() => setIsExpanded(false)}
                type="button"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Minimize player"
                aria-label="Minimize music player"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Song Info & Vinyl Record Section */}
          <div className="py-4 flex items-center gap-4 relative z-10">
            {/* Spinning Vinyl Record Disk */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-950 to-zinc-800 border-2 border-white/20 flex items-center justify-center shadow-lg relative overflow-hidden ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-1.5 rounded-full border border-white/10" />
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-5 rounded-full border border-white/5" />

                {/* Center Label */}
                <div className="w-6 h-6 rounded-full bg-cyan-500/90 flex items-center justify-center border border-white/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-black" />
                </div>
              </div>

              {/* Equalizer overlay badge when playing */}
              {isPlaying && (
                <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400 text-black shadow-sm">
                  <Music className="w-2.5 h-2.5" />
                </span>
              )}
            </div>

            {/* Song Metadata */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                  Sin Sisamuth (ស៊ិន ស៊ីសាមុត)
                </span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight truncate">
                Champei Siem Reap (ចំប៉ីសៀមរាប)
              </h4>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                King of Khmer Music · Classic Masterpiece
              </p>
            </div>
          </div>

          {/* Audio Progress Scrubber */}
          <div className="space-y-1.5 relative z-10 mb-3">
            <div className="relative group flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #22d3ee ${progressPercent}%, rgba(255,255,255,0.1) ${progressPercent}%)`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls Bar: Loop, Rewind, Play/Pause, Fast Forward, Volume */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between relative z-10">
            {/* Loop Toggle */}
            <button
              onClick={toggleLoop}
              type="button"
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isLooping
                  ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
              title={isLooping ? 'Looping enabled' : 'Enable loop'}
              aria-label="Loop song"
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>

            {/* Playback controls center */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => skipTime(-10)}
                type="button"
                className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                title="Rewind 10 seconds"
                aria-label="Rewind 10 seconds"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                type="button"
                className="w-10 h-10 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-black flex items-center justify-center transition-all shadow-[0_0_20px_rgba(6,182,212,0.45)] cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black translate-x-0.5" />
                )}
              </button>

              <button
                onClick={() => skipTime(10)}
                type="button"
                className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
                title="Forward 10 seconds"
                aria-label="Forward 10 seconds"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Volume & Mute */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                type="button"
                className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-3.5 h-3.5 text-zinc-200" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-zinc-200" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-cyan-400 hidden sm:block"
                title="Volume"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Minimized Floating Pill with Disk & Equalizer */
        <div className="flex items-center gap-2.5 p-2 pr-3.5 rounded-full bg-zinc-950/90 backdrop-blur-xl border border-white/15 hover:border-cyan-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.85)] shadow-cyan-950/25 transition-all text-white group">
          {/* Mini Spinning Vinyl Disc */}
          <button
            onClick={togglePlay}
            type="button"
            className="relative w-8 h-8 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0 hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
            title={isPlaying ? 'Pause song' : 'Play song'}
          >
            <Disc3
              className={`w-5 h-5 text-cyan-400 ${
                isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
              }`}
            />
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Song details & click to expand */}
          <button
            onClick={() => setIsExpanded(true)}
            type="button"
            className="flex flex-col text-left cursor-pointer"
            title="Click to expand player"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-semibold text-cyan-400 flex items-center gap-1 leading-none">
                <Music className="w-2.5 h-2.5" />
                <span>MP3 Audio</span>
              </span>
              {duration > 0 && (
                <span className="text-[10px] font-mono text-zinc-400 leading-none">
                  · {formatTime(currentTime)}
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-zinc-100 group-hover:text-cyan-300 transition-colors truncate max-w-[130px] sm:max-w-[180px]">
              Champei Siem Reap
            </span>
          </button>

          {/* Equalizer waveform or Play button */}
          <button
            onClick={togglePlay}
            type="button"
            className="p-1 rounded-full text-zinc-300 hover:text-white cursor-pointer ml-1"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3 px-1">
                <span className="w-0.5 h-2 bg-emerald-400 animate-[bounce_0.6s_infinite_100ms] rounded-full" />
                <span className="w-0.5 h-3.5 bg-cyan-400 animate-[bounce_0.6s_infinite_300ms] rounded-full" />
                <span className="w-0.5 h-1.5 bg-emerald-400 animate-[bounce_0.6s_infinite_200ms] rounded-full" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/40">
                <Play className="w-3 h-3 fill-cyan-300 translate-x-0.5" />
              </div>
            )}
          </button>

          {/* Expand Chevron */}
          <button
            onClick={() => setIsExpanded(true)}
            type="button"
            className="p-0.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Expand music player"
            aria-label="Expand music player"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
};
