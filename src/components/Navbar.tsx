import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Link2, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { useSocials } from '../context/SocialContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { getLink, openEditorForPlatform, showToast } = useSocials();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const ytLink = getLink('YouTube')?.url || getLink('YouTube Music')?.url || 'https://youtube.com/@rebexxxe?si=Pua7V5_i7NCPGj3n';
  const spItem = getLink('Spotify');
  const spLink = spItem?.url || '';
  const isSpotifyComingSoon =
    !spLink ||
    spLink === 'https://open.spotify.com' ||
    !spLink.includes('/artist/') ||
    spItem?.status === 'Coming Soon';
  const igLink = getLink('Instagram')?.url || 'https://instagram.com/rebabesss?rpxt=MWk3NTczNjgxdHFseA%3D%3D';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setAudioPlaying(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'music', label: 'MUSIC' },
    { id: 'visuals', label: 'VISUALS' },
    { id: 'words', label: 'WORDS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#C7C9CE]/15 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar 3-Zone Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (1 Primary Action) */}
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => handleNavClick('hero')}
              className="group text-left text-xl sm:text-2xl font-bold font-display-wordmark tracking-[0.25em] text-[#F2EEE9] hover:text-[#C7C9CE] transition-colors whitespace-nowrap shrink-0"
              aria-label="REBEXXX Home"
            >
              <span className="chrome-text">REBEXXX</span>
            </button>

            {/* Zone 2: 4-7 clean single-line nav links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-[0.2em] font-medium text-[#C7C9CE]/80">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`hover:text-[#F2EEE9] transition-colors whitespace-nowrap shrink-0 py-1 relative ${
                    activeSection === link.id ? 'text-[#F2EEE9]' : ''
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF1688]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action + Social Outlets + Audio Ambient toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Social Channels Icons (Desktop) */}
              <div className="hidden xl:flex items-center gap-2.5 border-r border-[#C7C9CE]/20 pr-3">
                <a
                  href={ytLink}
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube (@rebexxxe)"
                  className="p-1.5 text-[#C7C9CE]/70 hover:text-[#FF0000] hover:bg-white/5 transition-colors"
                  aria-label="REBEXXX on YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {isSpotifyComingSoon ? (
                  <button
                    type="button"
                    onClick={() => showToast('✨ REBEXXX on Spotify is launching soon! Artist profile in distributor setup.')}
                    title="Spotify (Launching Soon)"
                    className="p-1.5 text-[#C7C9CE]/70 hover:text-[#1DB954] hover:bg-white/5 transition-colors relative"
                    aria-label="REBEXXX on Spotify (Coming Soon)"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.216.353-.675.467-1.028.251-2.817-1.722-6.363-2.112-10.54-1.157-.403.092-.803-.16-.895-.563-.092-.403.16-.803.563-.895 4.57-1.044 8.489-.606 11.649 1.336.353.216.467.675.251 1.028zm1.47-3.268c-.272.443-.852.585-1.295.313-3.224-1.982-8.14-2.556-11.954-1.398-.498.151-1.031-.132-1.182-.63-.151-.498.132-1.031.63-1.182 4.364-1.325 9.794-.683 13.488 1.587.443.272.585.852.313 1.295zm.126-3.41c-3.864-2.294-10.244-2.506-13.93-1.387-.594.18-1.223-.153-1.403-.747-.18-.594.153-1.223.747-1.403 4.237-1.286 11.282-1.044 15.727 1.593.535.317.711 1.009.394 1.544-.317.535-1.009.711-1.544.394z"/>
                    </svg>
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  </button>
                ) : (
                  <a
                    href={spLink}
                    target="_blank"
                    rel="noreferrer"
                    title="Spotify"
                    className="p-1.5 text-[#C7C9CE]/70 hover:text-[#1DB954] hover:bg-white/5 transition-colors"
                    aria-label="REBEXXX on Spotify"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.216.353-.675.467-1.028.251-2.817-1.722-6.363-2.112-10.54-1.157-.403.092-.803-.16-.895-.563-.092-.403.16-.803.563-.895 4.57-1.044 8.489-.606 11.649 1.336.353.216.467.675.251 1.028zm1.47-3.268c-.272.443-.852.585-1.295.313-3.224-1.982-8.14-2.556-11.954-1.398-.498.151-1.031-.132-1.182-.63-.151-.498.132-1.031.63-1.182 4.364-1.325 9.794-.683 13.488 1.587.443.272.585.852.313 1.295zm.126-3.41c-3.864-2.294-10.244-2.506-13.93-1.387-.594.18-1.223-.153-1.403-.747-.18-.594.153-1.223.747-1.403 4.237-1.286 11.282-1.044 15.727 1.593.535.317.711 1.009.394 1.544-.317.535-1.009.711-1.544.394z"/>
                    </svg>
                  </a>
                )}

                <a
                  href={igLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="p-1.5 text-[#C7C9CE]/70 hover:text-[#E4405F] hover:bg-white/5 transition-colors"
                  aria-label="REBEXXX on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <button
                  onClick={() => openEditorForPlatform()}
                  title="Link / Manage Accounts"
                  className="p-1.5 text-[#C7C9CE]/60 hover:text-[#FF1688] hover:bg-white/5 transition-colors"
                  aria-label="Manage Connected Accounts"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtle ambient sound monitor button */}
              <button
                onClick={() => audioEngine.togglePlay()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C7C9CE]/90 hover:text-[#F2EEE9] border border-[#C7C9CE]/20 hover:border-[#C7C9CE]/40 transition-colors whitespace-nowrap shrink-0"
                title={audioPlaying ? 'Pause soundscape' : 'Play ambient sound'}
                aria-label={audioPlaying ? 'Pause soundscape' : 'Play ambient sound'}
              >
                {audioPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#FF1688] animate-pulse" />
                    <span className="font-mono text-[11px] tracking-wider">SOUND ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#C7C9CE]/60" />
                    <span className="font-mono text-[11px] tracking-wider">SOUNDSCAPE</span>
                  </>
                )}
              </button>

              {/* Primary Action Button */}
              <button
                onClick={() => handleNavClick('mailing-list')}
                className="px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#080808] bg-[#F2EEE9] hover:bg-[#C7C9CE] transition-all whitespace-nowrap shrink-0"
              >
                LETTERS
              </button>

              {/* Mobile hamburger menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#F2EEE9] hover:text-[#C7C9CE] transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col space-y-5">
            <div className="text-[11px] tracking-[0.25em] text-[#C7C9CE]/60 pb-3 border-b border-[#C7C9CE]/15">
              NAIROBI, KENYA · UNIVERSE IN MOTION
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-2xl font-serif tracking-wider transition-colors py-2 ${
                  activeSection === link.id
                    ? 'text-[#FF1688] font-bold pl-2 border-l border-[#FF1688]'
                    : 'text-[#F2EEE9] hover:text-[#C7C9CE]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('mailing-list')}
              className="text-left text-2xl font-serif tracking-wider text-[#C7C9CE] hover:text-white py-2"
            >
              LETTERS & UPDATES
            </button>

            {/* Mobile Channels Section */}
            <div className="pt-4 border-t border-[#C7C9CE]/15 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#C7C9CE]/60 uppercase">
                <span>OFFICIAL CHANNELS</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEditorForPlatform();
                  }}
                  className="text-[#FF1688] hover:underline"
                >
                  Edit Links
                </button>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={ytLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-[#121217] border border-[#C7C9CE]/15 text-xs font-mono text-[#F2EEE9] flex-1 text-center"
                >
                  YouTube
                </a>

                {isSpotifyComingSoon ? (
                  <button
                    type="button"
                    onClick={() => {
                      showToast('✨ REBEXXX on Spotify is launching soon! Artist profile in distributor setup.');
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 bg-[#121217] border border-[#C7C9CE]/15 text-xs font-mono text-[#F2EEE9] flex-1 text-center flex flex-col items-center justify-center gap-0.5"
                  >
                    <span>Spotify</span>
                    <span className="text-[9px] text-amber-300 font-sans tracking-wide">Coming Soon</span>
                  </button>
                ) : (
                  <a
                    href={spLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-[#121217] border border-[#C7C9CE]/15 text-xs font-mono text-[#F2EEE9] flex-1 text-center"
                  >
                    Spotify
                  </a>
                )}
                <a
                  href={igLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-[#121217] border border-[#C7C9CE]/15 text-xs font-mono text-[#F2EEE9] flex-1 text-center"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#C7C9CE]/15 space-y-4">

            <div className="flex items-center justify-between text-xs text-[#C7C9CE]/70">
              <span className="font-mono">AUDIO ENGINE</span>
              <button
                onClick={() => audioEngine.togglePlay()}
                className="flex items-center gap-2 px-3 py-1.5 border border-[#C7C9CE]/25 text-xs text-[#F2EEE9]"
              >
                {audioPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#FF1688]" />
                    <span>PLAYING</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>MUTED</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#C7C9CE]/50 tracking-wider">
              REBEXXX · NOT HERE TO BE ONE THING
            </p>
          </div>
        </div>
      )}
    </>
  );
};
