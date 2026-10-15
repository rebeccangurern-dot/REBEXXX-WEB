import React, { useState } from 'react';
import { NOTEBOOK_ENTRIES } from '../data/artistData';
import { Copy, Check, Feather, Sparkles, Music } from 'lucide-react';

export const WordsSection: React.FC = () => {
  const currentSong = NOTEBOOK_ENTRIES[0];
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copied, setCopied] = useState(false);

  const handleCopyLyrics = () => {
    const text = `${currentSong.title} — Official Lyrics\n\n${currentSong.stanzas.join('\n')}\n\n— Written & Performed by REBEXXX (${currentSong.writtenIn})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="words" className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#4A1026]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#FF1688]">
              <span>WORDS & SONGWRITING</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#C7C9CE]/70">OFFICIAL NOTEBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight">
              Lyrics & Vocal Manuscripts.
            </h2>
            <p className="text-base text-[#C7C9CE]/90 font-light leading-relaxed">
              Official handwritten drafts and song verses penned in Nairobi. Unfiltered, authentic, and unapologetic.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono text-[#C7C9CE]/60">READER SIZE:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 text-xs font-mono border transition-colors ${
                fontSize === 'normal'
                  ? 'border-[#FF1688] text-[#FF1688] bg-[#FF1688]/10'
                  : 'border-[#C7C9CE]/20 text-[#C7C9CE]/60 hover:text-white'
              }`}
            >
              1X
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs font-mono border transition-colors ${
                fontSize === 'large'
                  ? 'border-[#FF1688] text-[#FF1688] bg-[#FF1688]/10'
                  : 'border-[#C7C9CE]/20 text-[#C7C9CE]/60 hover:text-white'
              }`}
            >
              1.25X
            </button>
          </div>
        </div>

        {/* Focused Monograph Layout for UH HUH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Song Context & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c0c0f] border border-[#C7C9CE]/20 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#C7C9CE]/15 text-xs font-mono">
                <span className="text-[#FF1688] font-bold">SONG ARCHIVE 01</span>
                <span className="text-[#C7C9CE]/60">{currentSong.writtenIn}</span>
              </div>

              <div>
                <span className="text-xs font-mono text-[#C7C9CE]/50 tracking-wider">FEATURED TITLE</span>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#F2EEE9] mt-1">
                  {currentSong.title}
                </h3>
                <p className="text-xs font-mono text-[#C7C9CE]/70 mt-1">
                  Official Unreleased Demo · Written & Composed by REBEXXX
                </p>
              </div>

              <div className="pt-4 border-t border-[#C7C9CE]/10 space-y-3">
                <div className="text-xs font-mono text-[#C7C9CE]/60 tracking-wider uppercase">
                  SONGWRITING REFLECTION
                </div>
                <p className="text-sm font-light text-[#C7C9CE]/90 leading-relaxed italic bg-[#080808] p-4 border-l-2 border-[#FF1688]">
                  “{currentSong.artistReflection}”
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={handleCopyLyrics}
                  className="w-full py-3 border border-[#C7C9CE]/25 hover:border-[#F2EEE9] text-xs font-mono text-[#F2EEE9] flex items-center justify-center gap-2 transition-colors bg-[#080808]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">LYRICS COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY OFFICIAL LYRICS</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Note on Upcoming Songs */}
            <div className="p-5 bg-[#0a0a0d] border border-dashed border-[#C7C9CE]/20 text-xs font-mono text-[#C7C9CE]/70 space-y-2">
              <div className="flex items-center gap-2 text-[#FF1688]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SONGWRITING VAULT OPEN</span>
              </div>
              <p className="font-light leading-relaxed">
                As additional songs are written and recorded in studio, their official lyric sheets and manuscript notes will be archived here.
              </p>
            </div>
          </div>

          {/* Right Column: Full Lyric Sheet */}
          <div className="lg:col-span-7 bg-[#0a0a0d] border border-[#C7C9CE]/25 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-[#C7C9CE]/15 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                <Music className="w-3.5 h-3.5" />
                <span>OFFICIAL LYRIC MANUSCRIPT</span>
              </div>
              <span className="text-xs font-mono text-[#C7C9CE]/50">NAIROBI, KENYA</span>
            </div>

            {/* Lyrics Stanzas */}
            <div
              className={`space-y-3 font-serif text-[#F2EEE9] leading-relaxed tracking-wide ${
                fontSize === 'large' ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
              }`}
            >
              {currentSong.stanzas.map((line, idx) => (
                <p
                  key={idx}
                  className={
                    line === ''
                      ? 'h-4'
                      : line.includes('Uh Huh') || line.includes('Uh-huh')
                      ? 'text-[#FF1688] font-mono text-sm sm:text-base tracking-widest'
                      : 'opacity-95'
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Bottom Signature */}
            <div className="mt-12 pt-6 border-t border-[#C7C9CE]/15 flex items-center justify-between text-xs font-mono text-[#C7C9CE]/60">
              <span>— REBEXXX</span>
              <span className="italic font-serif">“I built my back you can&apos;t break it.”</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
