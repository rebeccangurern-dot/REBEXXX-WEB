import React, { useState, useEffect, useRef } from 'react';
import { UNRELEASED_TRACKS, ARTIST_INFO, SOCIAL_LINKS } from '../data/artistData';
import { AudioTrack } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { Play, Pause, Volume2, Sparkles, Sliders, Music, Check, Share2, Info, ExternalLink, Edit3, Link2 } from 'lucide-react';
import { useArtistImage } from '../context/ImageContext';
import { useSocials } from '../context/SocialContext';

export const MusicSection: React.FC = () => {
  const { artistImage } = useArtistImage();
  const { getLink, openEditorForPlatform } = useSocials();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(UNRELEASED_TRACKS[0].id);
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(UNRELEASED_TRACKS[0].id);
  const [volume, setVolume] = useState(0.75);
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);

  const activeTrack = UNRELEASED_TRACKS.find((t) => t.id === currentTrackId) || UNRELEASED_TRACKS[0];

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrackId(state.currentTrackId);
    });
    return unsubscribe;
  }, []);

  const handlePlayToggle = (track: AudioTrack) => {
    if (currentTrackId === track.id && isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.play(track.id);
      setExpandedTrackId(track.id);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  const handleCopyLyrics = (track: AudioTrack) => {
    navigator.clipboard.writeText(`"${track.lyricsExcerpt}" — REBEXXX (${track.title})`);
    setCopiedTrackId(track.id);
    setTimeout(() => setCopiedTrackId(null), 2000);
  };

  return (
    <section id="music" className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4A1026]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#243DCC]/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#FF1688]">
              <span>SONIC ARCHIVE & DEMOS</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#C7C9CE]/70">UNRELEASED PROTOTYPES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight">
              Music in Becoming.
            </h2>
            <p className="text-base text-[#C7C9CE]/90 font-light leading-relaxed">
              An open archive of unreleased demo sketches, harmonic prototypes, and sonic studies recorded in Nairobi.
              Audition prototypes with live Web Audio synthesis below.
            </p>
          </div>

          {/* Tasteful mandatory artist line */}
          <div className="p-4 bg-[#0e0e12] border border-[#FF1688]/30 max-w-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE REBEXXX LINE</span>
            </div>
            <p className="text-sm font-serif italic text-[#F2EEE9]">
              “{ARTIST_INFO.statusBanner}”
            </p>
          </div>
        </div>

        {/* Master Audio Console */}
        <div className="p-6 sm:p-8 bg-[#0c0c0f] border border-[#C7C9CE]/20 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#C7C9CE]/15">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-[#C7C9CE]/25 overflow-hidden bg-black group shadow-lg">
                <img
                  src={artistImage}
                  alt="REBEXXX Official Artwork"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => handlePlayToggle(activeTrack)}
                  className="absolute inset-0 bg-black/45 hover:bg-[#FF1688]/85 text-white transition-all flex items-center justify-center"
                  aria-label={isPlaying ? 'Pause Track' : 'Play Track'}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="text-[#FF1688] font-bold">{activeTrack.status}</span>
                  <span className="text-[#C7C9CE]/40">·</span>
                  <span className="text-[#C7C9CE]/80">{activeTrack.key}</span>
                  <span className="text-[#C7C9CE]/40">·</span>
                  <span className="text-[#C7C9CE]/80">{activeTrack.bpm} BPM</span>
                  {activeTrack.isPrivateTrack && (
                    <>
                      <span className="text-[#C7C9CE]/40">·</span>
                      <span className="text-emerald-400 font-semibold">PRIVATE STREAM VERIFIED</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F2EEE9] tracking-tight">
                  {activeTrack.title}
                </h3>
                <p className="text-xs text-[#C7C9CE]/70 font-mono">{activeTrack.subtitle}</p>
              </div>
            </div>

            {/* Audio Console Tools (Volume & Tone & External Link) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-center">
              {activeTrack.externalUrl && (
                <a
                  href={activeTrack.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#FF1688] hover:bg-[#ff2d97] text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-2 transition-all shadow-md shadow-[#FF1688]/20"
                >
                  <span>SOUNDCLOUD STREAM</span>
                  <Share2 className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-[#C7C9CE]/70" />
                <label htmlFor="volume-slider" className="sr-only">Monitor Volume</label>
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 sm:w-32 accent-[#FF1688] cursor-pointer"
                  aria-label="Volume Slider"
                />
                <span className="text-xs font-mono text-[#C7C9CE]/60 w-8 tabular-nums">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Special SoundCloud Embedded Player for UH HUH or tracks with externalUrl */}
          {activeTrack.externalUrl && (
            <div className="my-6 p-4 sm:p-5 bg-[#080808] border border-[#FF1688]/40 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-bold">DIRECT SOUNDCLOUD PRIVATE STREAM</span>
                  <span className="text-[#C7C9CE]/50">·</span>
                  <span className="text-[#F2EEE9]">OFFICIAL AUDIO</span>
                </div>
                <a
                  href={activeTrack.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-[#C7C9CE]/80 hover:text-white underline underline-offset-4 flex items-center gap-1.5"
                >
                  <span>OPEN ON SOUNDCLOUD</span>
                  <Share2 className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full overflow-hidden rounded-none border border-[#C7C9CE]/15 bg-black">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    activeTrack.externalUrl
                  )}&color=%23ff1688&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  title={`${activeTrack.title} - SoundCloud Player`}
                  className="w-full"
                />
              </div>
              <p className="text-[11px] font-mono text-[#C7C9CE]/60 mt-2">
                * Private unreleased link supplied directly by REBEXXX. You can listen via the SoundCloud player above or audition the synthesized harmonic stems below.
              </p>
            </div>
          )}

          {/* Active Track Extended Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            <div className="md:col-span-8 space-y-3">
              <div className="text-xs font-mono text-[#C7C9CE]/60 tracking-wider">SONIC ESSENCE & TEXTURE</div>
              <p className="text-sm text-[#F2EEE9] font-light leading-relaxed">
                {activeTrack.description}
              </p>
              <div className="p-4 bg-[#080808] border border-[#C7C9CE]/10 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#FF1688]">
                  <span>LYRIC FRAGMENT</span>
                  <button
                    onClick={() => handleCopyLyrics(activeTrack)}
                    className="flex items-center gap-1 text-[#C7C9CE]/70 hover:text-[#F2EEE9] transition-colors"
                  >
                    {copiedTrackId === activeTrack.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm font-serif italic text-[#C7C9CE]">
                  “{activeTrack.lyricsExcerpt}”
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-3 border-t md:border-t-0 md:border-l border-[#C7C9CE]/10 md:pl-6">
              <div className="text-xs font-mono text-[#C7C9CE]/60 tracking-wider">CREDITS & ORIGIN</div>
              <div className="space-y-2 text-xs font-light text-[#C7C9CE]/90">
                <div>
                  <span className="text-[#C7C9CE]/50 block font-mono text-[10px]">AUTHORS</span>
                  {activeTrack.credits}
                </div>
                <div>
                  <span className="text-[#C7C9CE]/50 block font-mono text-[10px]">RECORDED AT</span>
                  {activeTrack.recordedAt}
                </div>
                <div>
                  <span className="text-[#C7C9CE]/50 block font-mono text-[10px]">AVAILABILITY</span>
                  <span className="text-[#FF1688]">Private unreleased master</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Track Listings / Archive Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#C7C9CE]/70 px-2 pb-2 border-b border-[#C7C9CE]/15">
            <span>TRACKLIST / WORKS IN PROGRESS</span>
            <span>STATUS / PLAY</span>
          </div>

          {UNRELEASED_TRACKS.map((track, idx) => {
            const isThisPlaying = isPlaying && currentTrackId === track.id;
            const isThisExpanded = expandedTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`p-4 sm:p-5 transition-all border ${
                  isThisPlaying
                    ? 'bg-[#121217] border-[#FF1688]/60 shadow-lg'
                    : 'bg-[#0a0a0d] border-[#C7C9CE]/15 hover:border-[#C7C9CE]/35'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-[#C7C9CE]/50 tabular-nums pt-1 sm:pt-0">
                      0{idx + 1}.
                    </span>

                    <button
                      onClick={() => handlePlayToggle(track)}
                      className={`w-9 h-9 flex items-center justify-center shrink-0 border transition-all ${
                        isThisPlaying
                          ? 'bg-[#FF1688] text-white border-[#FF1688]'
                          : 'bg-transparent text-[#F2EEE9] border-[#C7C9CE]/30 hover:border-[#F2EEE9]'
                      }`}
                      aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    >
                      {isThisPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-base sm:text-lg font-serif font-medium text-[#F2EEE9]">
                          {track.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#FF1688] px-1.5 py-0.5 border border-[#FF1688]/30">
                          {track.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#C7C9CE]/70 font-mono mt-0.5">{track.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-end sm:self-center">
                    {track.externalUrl && (
                      <a
                        href={track.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-[#FF1688] hover:text-white flex items-center gap-1.5 border border-[#FF1688]/40 hover:bg-[#FF1688]/20 px-2.5 py-1 transition-colors"
                      >
                        <span>SOUNDCLOUD LINK</span>
                        <Share2 className="w-3 h-3" />
                      </a>
                    )}
                    <span className="text-xs font-mono text-[#C7C9CE]/60">
                      {track.key} · {track.bpm} BPM
                    </span>
                    <button
                      onClick={() => setExpandedTrackId(isThisExpanded ? null : track.id)}
                      className="text-xs font-mono text-[#C7C9CE]/80 hover:text-[#F2EEE9] underline underline-offset-4"
                    >
                      {isThisExpanded ? 'HIDE DETAILS' : 'INSPECT'}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details Drawer */}
                {isThisExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#C7C9CE]/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-[#C7C9CE]/90 animate-in fade-in">
                    <div>
                      <span className="font-mono text-[10px] text-[#C7C9CE]/50 block">SONIC MOOD</span>
                      <p className="mt-1">{track.sonicMood}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#C7C9CE]/50 block">NOTEBOOK FRAGMENT</span>
                      <p className="mt-1 italic font-serif text-[#F2EEE9]">“{track.lyricsExcerpt}”</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Open Slot for future unreleased demo additions */}
          <div className="p-4 sm:p-5 border border-dashed border-[#C7C9CE]/25 bg-[#080808]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#C7C9CE]/40">02.</span>
              <div className="w-9 h-9 border border-dashed border-[#C7C9CE]/30 flex items-center justify-center text-[#C7C9CE]/40">
                <Sparkles className="w-4 h-4 text-[#FF1688]/70" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-serif text-[#C7C9CE]/80">NEXT DEMO SLOT (OPEN)</span>
                  <span className="text-[10px] font-mono text-[#C7C9CE]/50 px-1.5 py-0.5 border border-[#C7C9CE]/20">
                    RESERVED FOR STUDIO
                  </span>
                </div>
                <p className="text-xs text-[#C7C9CE]/60 font-mono mt-0.5">
                  Vault open for upcoming demo sketches · Drop audio links in chat anytime to expand
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#FF1688]/90 self-start sm:self-center">
              VAULT OPEN FOR EXPANSION
            </span>
          </div>
        </div>

        {/* Official Streaming & Channel Outlets */}
        <div className="mt-16 p-6 sm:p-8 bg-[#0c0c0f] border border-[#C7C9CE]/15 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#C7C9CE]/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                <Music className="w-4 h-4 text-[#FF1688]" />
                <span className="tracking-widest uppercase">OFFICIAL STREAMING & ARCHIVE PROFILES</span>
              </div>
              <h4 className="text-2xl font-serif text-[#F2EEE9]">Connect to REBEXXX on All Channels</h4>
              <p className="text-xs sm:text-sm text-[#C7C9CE]/80 font-light leading-relaxed max-w-2xl">
                Stream unreleased material, follow upcoming releases on Spotify & YouTube Music, and explore visual updates on Instagram.
              </p>
            </div>

            <button
              onClick={() => openEditorForPlatform()}
              className="self-start lg:self-center flex items-center gap-2 px-4 py-2 border border-[#FF1688]/60 bg-[#FF1688]/10 hover:bg-[#FF1688] text-white text-xs font-mono tracking-wider transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>LINK / EDIT ACCOUNTS</span>
            </button>
          </div>

          {/* Connected Profile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {/* 1. YouTube */}
            {(() => {
              const yt = getLink('YouTube') || getLink('YouTube Music') || {
                platform: 'YouTube',
                url: 'https://youtube.com/@rebexxxe?si=Pua7V5_i7NCPGj3n',
                handle: '@rebexxxe',
                status: 'Active',
              };
              return (
                <div className="p-5 bg-[#08080a] border border-[#C7C9CE]/15 hover:border-[#FF0000]/50 transition-colors flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span className="text-xs font-mono tracking-wider font-semibold text-[#F2EEE9]">
                          YOUTUBE
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/40 text-red-300 border border-red-500/30">
                        {yt.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#C7C9CE]/70">
                      Official artist channel, music video releases, audio visualizers & sound studies.
                    </p>
                    <div className="text-[11px] font-mono text-[#FF1688] truncate font-medium">
                      {yt.handle}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-2 border-t border-[#C7C9CE]/10 mt-4">
                    <a
                      href={yt.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F2EEE9] hover:text-[#FF0000] transition-colors"
                    >
                      <span>Watch & Stream on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openEditorForPlatform('YouTube')}
                      className="text-[10px] font-mono text-[#C7C9CE]/50 hover:text-white px-2 py-1 border border-[#C7C9CE]/20"
                    >
                      Edit URL
                    </button>
                  </div>
                </div>
              );
            })()}


            {/* 2. Spotify */}
            {(() => {
              const sp = getLink('Spotify') || {
                platform: 'Spotify',
                url: 'https://open.spotify.com',
                handle: 'REBEXXX',
                status: 'Active',
              };
              return (
                <div className="p-5 bg-[#08080a] border border-[#C7C9CE]/15 hover:border-[#1DB954]/50 transition-colors flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.216.353-.675.467-1.028.251-2.817-1.722-6.363-2.112-10.54-1.157-.403.092-.803-.16-.895-.563-.092-.403.16-.803.563-.895 4.57-1.044 8.489-.606 11.649 1.336.353.216.467.675.251 1.028zm1.47-3.268c-.272.443-.852.585-1.295.313-3.224-1.982-8.14-2.556-11.954-1.398-.498.151-1.031-.132-1.182-.63-.151-.498.132-1.031.63-1.182 4.364-1.325 9.794-.683 13.488 1.587.443.272.585.852.313 1.295zm.126-3.41c-3.864-2.294-10.244-2.506-13.93-1.387-.594.18-1.223-.153-1.403-.747-.18-.594.153-1.223.747-1.403 4.237-1.286 11.282-1.044 15.727 1.593.535.317.711 1.009.394 1.544-.317.535-1.009.711-1.544.394z"/>
                        </svg>
                        <span className="text-xs font-mono tracking-wider font-semibold text-[#F2EEE9]">
                          SPOTIFY
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                        {sp.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#C7C9CE]/70">
                      Official artist page, pre-save upcoming releases & follow discography.
                    </p>
                    <div className="text-[11px] font-mono text-[#C7C9CE]/50 truncate">
                      {sp.handle}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-2 border-t border-[#C7C9CE]/10 mt-4">
                    <a
                      href={sp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F2EEE9] hover:text-[#1DB954] transition-colors"
                    >
                      <span>Open on Spotify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openEditorForPlatform('Spotify')}
                      className="text-[10px] font-mono text-[#C7C9CE]/50 hover:text-white px-2 py-1 border border-[#C7C9CE]/20"
                    >
                      Edit URL
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 3. SoundCloud */}
            {(() => {
              const sc = getLink('SoundCloud') || {
                platform: 'SoundCloud',
                url: 'https://soundcloud.com/user-669712436/uh-huh-gen1/s-WXRsd2Eqdeo?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&si=a384bd325ff942978d810c832c0e513d',
                handle: 'REBEXXX (Private Vault)',
                status: 'Active',
              };
              return (
                <div className="p-5 bg-[#08080a] border border-[#C7C9CE]/15 hover:border-[#FF5500]/50 transition-colors flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.175 12.225c-.051 0-.094.045-.101.1l-.315 2.879c-.01.076.04.143.114.146l.302.01c.058 0 .108-.045.115-.106l.315-2.879a.125.125 0 0 0-.115-.15zm1.536-.788c-.067 0-.126.052-.132.122l-.462 4.444c-.01.087.052.164.137.167l.386.012c.075 0 .137-.058.145-.133l.462-4.444c.007-.09-.057-.168-.136-.168zm1.616-.838c-.085 0-.154.067-.161.155l-.467 6.104c-.007.098.067.181.164.184l.432.014c.092 0 .167-.073.174-.167l.467-6.104c.007-.101-.067-.186-.165-.186zm1.666-.089c-.1 0-.183.08-.19.186l-.426 6.368c-.007.108.077.2.187.202l.462.015c.105 0 .19-.085.197-.193l.426-6.368c.007-.113-.076-.208-.186-.21zm1.688.528c-.114 0-.21.096-.217.218l-.348 5.688c-.007.119.086.219.208.221l.487.016c.117 0 .214-.097.221-.219l.348-5.688c.007-.126-.085-.231-.208-.236zm1.705.908c-.126 0-.231.107-.238.241l-.229 4.779c-.007.13.095.238.229.24l.498.016c.129 0 .235-.107.242-.241l.229-4.779c.007-.137-.094-.251-.231-.256zm12.614-2.822c-.675 0-1.309.215-1.834.577a5.53 5.53 0 0 0-5.328-3.925c-.569 0-1.116.086-1.633.245-.262.08-.344.256-.344.475v10.354c0 .307.25.556.556.556h8.583c2.757 0 5-2.243 5-5 0-2.757-2.243-5-5-5z"/>
                        </svg>
                        <span className="text-xs font-mono tracking-wider font-semibold text-[#F2EEE9]">
                          SOUNDCLOUD
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-950/40 text-orange-300 border border-orange-500/30">
                        {sc.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#C7C9CE]/70">
                      Private listening room streaming the official debut demo of UH HUH.
                    </p>
                    <div className="text-[11px] font-mono text-[#C7C9CE]/50 truncate">
                      {sc.handle}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-2 border-t border-[#C7C9CE]/10 mt-4">
                    <a
                      href={sc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F2EEE9] hover:text-[#FF5500] transition-colors"
                    >
                      <span>Stream Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => openEditorForPlatform('SoundCloud')}
                      className="text-[10px] font-mono text-[#C7C9CE]/50 hover:text-white px-2 py-1 border border-[#C7C9CE]/20"
                    >
                      Edit URL
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

      </div>
    </section>
  );
};
