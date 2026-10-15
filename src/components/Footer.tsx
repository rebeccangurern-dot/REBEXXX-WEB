import React from 'react';
import { ARTIST_INFO } from '../data/artistData';
import { useSocials } from '../context/SocialContext';
import { ArrowUp, Sparkles, Globe, Edit3, ExternalLink, Download } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { socialLinks, openEditorForPlatform } = useSocials();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#C7C9CE]/15 py-16 text-[#C7C9CE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#C7C9CE]/10">
          {/* Col 1: Wordmark & Core Motto */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-3xl font-display-wordmark tracking-[0.25em] text-[#F2EEE9] hover:text-[#C7C9CE] transition-colors"
            >
              <span className="chrome-text">REBEXXX</span>
            </button>
            <p className="text-sm font-serif italic text-[#C7C9CE]/80 max-w-sm">
              “{ARTIST_INFO.coreIdea}”
            </p>
            <p className="text-xs font-mono text-[#C7C9CE]/60">
              Raw. Intentional. Evolving. With so much love.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688] pt-2">
              <Globe className="w-3.5 h-3.5" />
              <span>NAIROBI, KENYA · UTC+3</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#F2EEE9] uppercase">
              SECTIONS
            </div>
            <ul className="space-y-2 text-xs font-mono text-[#C7C9CE]/70">
              {['about', 'music', 'visuals', 'words', 'contact', 'mailing-list'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => onNavigate(sec)}
                    className="hover:text-[#F2EEE9] transition-colors uppercase tracking-wider"
                  >
                    {sec.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Music Outlets */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono tracking-widest text-[#F2EEE9] uppercase">
                OUTLETS & ARCHIVES
              </div>
              <button
                onClick={() => openEditorForPlatform()}
                className="flex items-center gap-1 text-[11px] font-mono text-[#FF1688] hover:underline"
              >
                <Edit3 className="w-3 h-3" />
                <span>Link Accounts</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {socialLinks.map((link) => (
                <div
                  key={link.platform}
                  className="flex items-center justify-between text-xs font-mono py-1 border-b border-[#C7C9CE]/10"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[#F2EEE9] hover:text-[#FF1688] transition-colors"
                  >
                    <span>{link.platform}</span>
                    <ExternalLink className="w-3 h-3 text-[#C7C9CE]/40" />
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#C7C9CE]/50 truncate max-w-[110px]">
                      {link.handle}
                    </span>
                    <span
                      className={`text-[10px] ${
                        link.status === 'Active' ? 'text-emerald-400' : 'text-[#C7C9CE]/50'
                      }`}
                    >
                      {link.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#C7C9CE]/50">
          <div>
            © {new Date().getFullYear()} REBEXXX. All creative works, music, writings, and imagery reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#F2EEE9] transition-colors border border-[#C7C9CE]/20 px-3 py-1.5"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
