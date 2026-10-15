import React, { useState } from 'react';
import { ARTIST_INFO } from '../data/artistData';
import { Sparkles, Heart, Compass, Eye } from 'lucide-react';
import { useArtistImage } from '../context/ImageContext';

export const AboutSection: React.FC = () => {
  const { artistImage } = useArtistImage();
  const [activeTab, setActiveTab] = useState<'promise' | 'disciplines' | 'influences' | 'nairobi'>('promise');

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#4A1026]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#243DCC]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#FF1688]">
            <span>ABOUT REBEXXX</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#C7C9CE]/70">AN ARTIST IN BECOMING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight">
            Not a finished character. <br />
            <span className="italic text-[#C7C9CE]">A world in motion.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#C7C9CE]/90 font-light leading-relaxed">
            REBEXXX gives meaning to the words she sings and writes in a world where generic is the norm.
            Edgy but soft, rebellious but safe, sexy but not scandalous, dangerous and kind.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Story Narrative Left Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Childhood Concert Story */}
            <div className="relative p-6 sm:p-8 bg-[#0e0e11] border border-[#C7C9CE]/15 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#C7C9CE]/10 text-xs font-mono text-[#C7C9CE]/70">
                <span className="tracking-widest">CHAPTER 01</span>
                <span className="text-[#FF1688]">THE 100,000 DOLLS CONCERT</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start mt-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden border border-[#C7C9CE]/25 bg-black shadow-lg">
                  <img
                    src={artistImage}
                    alt="REBEXXX"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <blockquote className="text-lg sm:text-xl font-serif italic text-[#F2EEE9] leading-relaxed">
                  “I used to perform concerts at home for 100,000 imaginary fans: my dolls.
                  They sat across the floor in patient rows, listening to melodies I pulled out of thin air.
                  Now I'm keeping the promise I made to that younger version of myself.”
                </blockquote>
              </div>
              <div className="mt-8 text-sm sm:text-base text-[#C7C9CE]/90 space-y-4 font-light leading-relaxed">
                <p>
                  I've wanted to be an artist for as long as I can remember. I've always found ways to express myself through what I wear, what I paint, what I write, and what I imagine.
                </p>
                <p>
                  That same creative instinct follows me into everything I build, including my businesses. I love taking an idea, imagining what it could become, and finding ways to bring it to life. Whether I'm creating music, developing a concept, or building something from the ground up, I'm drawn to possibilities that don't yet have a shape.
                </p>
                <p>
                  I'm genre-fluid by nature. I don't want to be confined to one sound, one medium, or one version of myself.
                </p>
                <p>
                  I don't have everything figured out, and I don't need to. I'm giving myself permission to create, experiment, be seen, and discover how far I can go.
                </p>
                <p>
                  This is me, right now. It doesn't dictate who I'll be tomorrow. But choosing this path feels like a step towards the person I've always imagined becoming.
                </p>

                <div className="pt-2 pb-1 space-y-1.5 font-normal text-[#F2EEE9] border-l-2 border-[#FF1688]/60 pl-4 my-6">
                  <p>It's been brewing in me for a long time.</p>
                  <p>It's time for the world to see.</p>
                  <p className="text-[#FF1688]">It's time for me to see myself.</p>
                </div>

                <div className="pt-4 border-t border-[#C7C9CE]/10">
                  <p className="text-sm text-[#C7C9CE]/80 italic font-serif">With so much love,</p>
                  <p className="text-lg font-serif font-semibold tracking-wider text-[#F2EEE9] mt-1">REBEXXX</p>
                </div>
              </div>
            </div>

            {/* Nairobi Base Callout */}
            <div className="p-6 bg-[#080808] border border-[#C7C9CE]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono tracking-widest text-[#FF1688]">CURRENT BASE & ANCHOR</div>
                <div className="text-xl font-serif text-[#F2EEE9]">Nairobi, Kenya</div>
                <p className="text-xs text-[#C7C9CE]/80 font-light max-w-md">
                  Drawing from the vibrant rhythm, midnight rainfall, and unfiltered creative independence of Nairobi’s alternative pulse.
                </p>
              </div>
              <div className="px-3 py-1.5 bg-[#4A1026]/40 border border-[#FF1688]/30 text-[11px] font-mono text-[#F2EEE9] whitespace-nowrap">
                EMERGING ARTIST
              </div>
            </div>

            {/* Honest Bio Disclaimer */}
            <div className="text-xs text-[#C7C9CE]/60 font-mono tracking-wider border-l-2 border-[#FF1688] pl-4 py-1">
              NOTE: REBEXXX is an emerging independent artist currently developing initial demos and unreleased bodies of work.
              No artificial achievements, synthetic accolades, or manufactured personas. Pure process.
            </div>
          </div>

          {/* Right Column: Interactive Dimension Inspector */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tabs for Exploring Aspects */}
            <div className="flex border-b border-[#C7C9CE]/20 pb-2 gap-2 text-xs font-mono tracking-wider">
              <button
                onClick={() => setActiveTab('promise')}
                className={`px-3 py-2 transition-colors ${
                  activeTab === 'promise'
                    ? 'text-[#F2EEE9] border-b-2 border-[#FF1688] font-bold'
                    : 'text-[#C7C9CE]/60 hover:text-[#C7C9CE]'
                }`}
              >
                PROMISE
              </button>
              <button
                onClick={() => setActiveTab('disciplines')}
                className={`px-3 py-2 transition-colors ${
                  activeTab === 'disciplines'
                    ? 'text-[#F2EEE9] border-b-2 border-[#FF1688] font-bold'
                    : 'text-[#C7C9CE]/60 hover:text-[#C7C9CE]'
                }`}
              >
                DISCIPLINES
              </button>
              <button
                onClick={() => setActiveTab('influences')}
                className={`px-3 py-2 transition-colors ${
                  activeTab === 'influences'
                    ? 'text-[#F2EEE9] border-b-2 border-[#FF1688] font-bold'
                    : 'text-[#C7C9CE]/60 hover:text-[#C7C9CE]'
                }`}
              >
                RESONANCES
              </button>
            </div>

            {/* Tab 1: The Promise */}
            {activeTab === 'promise' && (
              <div className="p-6 bg-[#0c0c0f] border border-[#C7C9CE]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                  <Heart className="w-3.5 h-3.5" />
                  <span>THE ARTISTIC CONTRACT</span>
                </div>
                <h3 className="text-xl font-serif text-[#F2EEE9]">A Promise Kept in Full</h3>
                <p className="text-sm text-[#C7C9CE]/85 leading-relaxed font-light">
                  Growing up, we are constantly coached into narrowing ourselves down to fit market rubrics.
                  REBEXXX rejects this trade-off. Every lyric written, every pigment stroked onto linen,
                  and every silhouette draped in darkness is an act of honoring the original spark.
                </p>
                <div className="pt-3 border-t border-[#C7C9CE]/10 space-y-2">
                  <div className="text-xs font-mono text-[#C7C9CE]/60">CONTRADICTIONS HELD SACRED</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#F2EEE9]">
                    <div className="p-2 bg-[#080808] border border-[#C7C9CE]/10">· Edgy but soft</div>
                    <div className="p-2 bg-[#080808] border border-[#C7C9CE]/10">· Rebellious but safe</div>
                    <div className="p-2 bg-[#080808] border border-[#C7C9CE]/10">· Sexy, not scandalous</div>
                    <div className="p-2 bg-[#080808] border border-[#C7C9CE]/10">· Dangerous & kind</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Multidisciplinary Expression */}
            {activeTab === 'disciplines' && (
              <div className="p-6 bg-[#0c0c0f] border border-[#C7C9CE]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MULTIDISCIPLINARY SPECTRUM</span>
                </div>
                <h3 className="text-xl font-serif text-[#F2EEE9]">Four Mediums, One Pulse</h3>
                <div className="space-y-3 pt-2">
                  {ARTIST_INFO.dimensions.map((dim, idx) => (
                    <div key={idx} className="p-3 bg-[#080808] border border-[#C7C9CE]/10 space-y-1">
                      <div className="text-xs font-bold text-[#F2EEE9] tracking-wider uppercase font-mono">
                        {dim.title}
                      </div>
                      <p className="text-xs text-[#C7C9CE]/80 font-light leading-relaxed">
                        {dim.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Influences & Resonances */}
            {activeTab === 'influences' && (
              <div className="p-6 bg-[#0c0c0f] border border-[#C7C9CE]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CREATIVE CONSTELLATION</span>
                </div>
                <h3 className="text-xl font-serif text-[#F2EEE9]">Artistic Qualities & Resonances</h3>
                <p className="text-xs text-[#C7C9CE]/80 font-light leading-relaxed">
                  Inspired by fearless qualities—experimentation, visual storytelling, confidence, sensuality, emotional depth, and reinvention—without imitating:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {ARTIST_INFO.influences.map((inf, i) => (
                    <div key={i} className="p-2.5 bg-[#080808] border border-[#C7C9CE]/10 space-y-1">
                      <div className="text-xs font-semibold text-[#F2EEE9] font-mono">{inf.name}</div>
                      <div className="text-[11px] text-[#C7C9CE]/70 leading-snug">{inf.resonance}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
