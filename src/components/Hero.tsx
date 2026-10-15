import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, Disc3, Play, Pause, Sparkles } from 'lucide-react';
import { ARTIST_INFO, UNRELEASED_TRACKS } from '../data/artistData';
import { audioEngine } from '../utils/audioEngine';
import { useArtistImage } from '../context/ImageContext';

interface HeroProps {
  onEnterWorld: () => void;
  onExploreMusic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterWorld, onExploreMusic }) => {
  const { artistImage, hasCustomImage, setArtistImageFile, triggerFileSelect } = useArtistImage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(UNRELEASED_TRACKS[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      const active = UNRELEASED_TRACKS.find((t) => t.id === state.currentTrackId) || UNRELEASED_TRACKS[0];
      setCurrentTrack(active);
    });
    return unsubscribe;
  }, []);

  // Live waveform visualizer canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const data = audioEngine.getAnalyserData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 3;
      const gap = 2;
      const count = Math.min(data.length, Math.floor(canvas.width / (barWidth + gap)));

      for (let i = 0; i < count; i++) {
        let value = data[i] || 0;
        if (!isPlaying) {
          // Subtle idle gentle shimmer
          value = Math.sin(Date.now() / 350 + i * 0.3) * 12 + 16;
        }
        const barHeight = Math.max(3, (value / 255) * canvas.height * 0.9);
        const x = i * (barWidth + gap);
        const y = canvas.height - barHeight;

        ctx.fillStyle = isPlaying ? '#FF1688' : '#C7C9CE';
        ctx.globalAlpha = isPlaying ? 0.9 : 0.4;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background ambient deep burgundy & obsidian glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#4A1026]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#243DCC]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full film-grain opacity-40 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        {/* Editorial Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Top Kicker */}
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#C7C9CE]/80 font-mono">
              <span>{ARTIST_INFO.location.toUpperCase()}</span>
              <span aria-hidden="true" className="text-[#FF1688]">·</span>
              <span>MULTIDISCIPLINARY ARTIST</span>
              <span aria-hidden="true" className="text-[#FF1688]">·</span>
              <span>GENRE-FLUID</span>
            </div>

            {/* Giant REBEXXX Wordmark */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black font-display-wordmark tracking-[0.2em] text-[#F2EEE9] leading-none">
                <span className="chrome-text">REBEXXX</span>
              </h1>
              <div className="h-[2px] w-24 bg-gradient-to-r from-[#FF1688] via-[#C7C9CE] to-transparent" />
            </div>

            {/* Headline & Subhead */}
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif tracking-tight text-[#F2EEE9] font-normal leading-[1.15]" style={{ textWrap: 'balance' }}>
                {ARTIST_INFO.headline}
              </h2>
              <p className="text-lg sm:text-xl font-light text-[#C7C9CE] italic font-serif">
                {ARTIST_INFO.subheadline}
              </p>
            </div>

            {/* Core Philosophy Callout */}
            <p className="text-sm sm:text-base text-[#F2EEE9]/80 leading-relaxed font-light max-w-xl">
              Enigmatic, sensual, honest, hopeful, daring, adaptable, rebellious, and kind.
              Giving meaning to words in a world where generic is the norm.
              <span className="block mt-2 text-[#C7C9CE] italic font-serif">
                “REBEXXX is not a finished character. She is a world in motion.”
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onEnterWorld}
                className="group px-7 py-3.5 text-xs font-semibold tracking-[0.2em] bg-[#F2EEE9] text-[#080808] hover:bg-[#C7C9CE] transition-all flex items-center gap-2 shadow-lg shadow-black/60"
              >
                <span>ENTER MY WORLD</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={onExploreMusic}
                className="px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#F2EEE9] border border-[#C7C9CE]/30 hover:border-[#F2EEE9] hover:bg-[#C7C9CE]/10 transition-all flex items-center gap-2"
              >
                <Disc3 className="w-4 h-4 text-[#FF1688]" />
                <span>EXPLORE THE MUSIC</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fashion Visual Container */}
          <div className="lg:col-span-5 relative">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) setArtistImageFile(file);
              }}
              className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-[#0a0a0c] border border-[#C7C9CE]/20 shadow-2xl shadow-black group"
            >
              {/* Corner editorial accents & File Upload Trigger */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#F2EEE9]/70 bg-[#080808]/80 px-2 py-0.5 backdrop-blur-sm border border-[#C7C9CE]/20">
                  OFFICIAL ARTWORK
                </span>
              </div>

              {/* Upload / Replace button so she can use the exact original file without alterations */}
              <button
                onClick={triggerFileSelect}
                className="absolute top-3 right-3 z-20 text-[10px] font-mono tracking-widest px-2.5 py-1 backdrop-blur-md transition-all border flex items-center gap-1.5 shadow-lg bg-[#080808]/90 text-[#FF1688] border-[#FF1688]/40 hover:bg-[#FF1688] hover:text-white"
                title="Select the exact image file from your device"
              >
                <span>{hasCustomImage ? 'REPLACE ORIGINAL PHOTO' : 'LOAD EXACT ORIGINAL PHOTO'}</span>
              </button>

              {/* Pure unedited artist image - no overlays, filters, or tint shifts */}
              <img
                src={artistImage}
                alt="REBEXXX official artist portrait"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <div className="p-2.5 bg-[#080808]/90 backdrop-blur-md border border-[#C7C9CE]/20 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-serif italic text-[#F2EEE9]">
                      “Giving herself permission to find out how far she can go.”
                    </p>
                    <p className="text-[10px] font-mono text-[#C7C9CE]/70">
                      Official Artwork · REBEXXX
                    </p>
                  </div>
                  <button
                    onClick={triggerFileSelect}
                    className="text-[10px] font-mono text-[#FF1688] hover:text-white underline underline-offset-2 shrink-0"
                  >
                    CHANGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Unreleased Sonic Strip below the hero split */}
      <div className="relative w-full border-y border-[#C7C9CE]/15 bg-[#080808]/95 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Sonic Identity Label */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => audioEngine.togglePlay(currentTrack.id)}
                className="w-10 h-10 rounded-none bg-[#F2EEE9] text-[#080808] hover:bg-[#FF1688] hover:text-white transition-colors flex items-center justify-center shrink-0"
                aria-label={isPlaying ? 'Pause Audio' : 'Play Unreleased Track'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#FF1688] font-bold">UNRELEASED DEMO</span>
                  <span className="text-[#C7C9CE]/50">·</span>
                  <span className="text-[#F2EEE9] tracking-wider font-semibold">{currentTrack.title}</span>
                </div>
                <div className="text-[11px] text-[#C7C9CE]/70 truncate max-w-xs sm:max-w-md">
                  {currentTrack.sonicMood}
                </div>
              </div>
            </div>

            {/* Live Interactive Waveform Canvas & Stream Button */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              {currentTrack.externalUrl && (
                <a
                  href={currentTrack.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-[#FF1688] hover:bg-[#ff2d97] text-white text-[11px] font-mono tracking-wider transition-colors shrink-0 shadow-sm"
                >
                  LISTEN ON SOUNDCLOUD
                </a>
              )}

              <div className="flex flex-col items-end">
                <canvas ref={canvasRef} width={130} height={22} className="block" />
                <span className="text-[9px] font-mono text-[#C7C9CE]/50 mt-0.5 tracking-wider">
                  {isPlaying ? 'FREQUENCY MONITOR ACTIVE' : 'CLICK TO AUDITION'}
                </span>
              </div>

              {/* Status Notice */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#4A1026]/30 border border-[#4A1026]/60 text-[11px] text-[#F2EEE9]">
                <Sparkles className="w-3 h-3 text-[#FF1688]" />
                <span>{ARTIST_INFO.statusBanner}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
