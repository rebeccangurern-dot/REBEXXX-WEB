import React, { useState, useEffect } from 'react';
import { UNRELEASED_TRACKS } from '../data/artistData';
import { audioEngine } from '../utils/audioEngine';
import { Play, Pause, Volume2, VolumeX, Disc3, X } from 'lucide-react';
import { useArtistImage } from '../context/ImageContext';

interface AudioPlayerDockProps {
  onOpenMusic: () => void;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({ onOpenMusic }) => {
  const { artistImage } = useArtistImage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(UNRELEASED_TRACKS[0].id);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrackId(state.currentTrackId);
    });
    return unsubscribe;
  }, []);

  const activeTrack = UNRELEASED_TRACKS.find((t) => t.id === currentTrackId) || UNRELEASED_TRACKS[0];

  // Only show when playing or has been actively engaged
  if (!isPlaying && minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-[#0c0c0f] border border-[#FF1688]/50 text-[#F2EEE9] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-xs font-mono"
        aria-label="Open Audio Dock"
      >
        <Disc3 className="w-4 h-4 text-[#FF1688]" />
        <span>REBEXXX SOUND</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Audio player dock"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-[#0a0a0d]/95 backdrop-blur-xl border border-[#C7C9CE]/30 p-3.5 shadow-2xl shadow-black animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-10 h-10 shrink-0 border border-[#C7C9CE]/30 overflow-hidden bg-black shadow-md">
            <img
              src={artistImage}
              alt="REBEXXX"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => audioEngine.togglePlay(activeTrack.id)}
              className="absolute inset-0 bg-black/40 hover:bg-[#FF1688]/80 text-white transition-all flex items-center justify-center"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF1688]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1688] animate-pulse" />
              <span>UNRELEASED PROTOTYPE</span>
            </div>
            <button
              onClick={onOpenMusic}
              className="text-xs font-serif font-semibold text-[#F2EEE9] hover:text-[#C7C9CE] truncate block text-left"
            >
              {activeTrack.title}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {activeTrack.externalUrl && (
            <a
              href={activeTrack.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-mono text-[#FF1688] hover:text-white px-1.5 py-0.5 border border-[#FF1688]/40"
            >
              STREAM
            </a>
          )}
          <button
            onClick={onOpenMusic}
            className="text-[11px] font-mono text-[#C7C9CE]/80 hover:text-white underline underline-offset-2 px-1"
          >
            ARCHIVE
          </button>

          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-[#C7C9CE]/50 hover:text-[#F2EEE9] transition-colors"
            aria-label="Minimize player dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
