import React, { useState, useEffect } from 'react';
import { useSocials } from '../context/SocialContext';
import { X, Check, ExternalLink, Link2, Music, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const SocialAccountsModal: React.FC = () => {
  const { isEditorOpen, closeEditor, socialLinks, updateSocialLink, selectedPlatformToEdit } = useSocials();

  const [formValues, setFormValues] = useState<{
    [platform: string]: { url: string; handle: string };
  }>({});

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isEditorOpen) {
      const initial: { [platform: string]: { url: string; handle: string } } = {};
      socialLinks.forEach((link) => {
        initial[link.platform] = {
          url: link.url,
          handle: link.handle,
        };
      });
      setFormValues(initial);
      setSavedStatus(null);
    }
  }, [isEditorOpen, socialLinks]);

  if (!isEditorOpen) return null;

  const handleInputChange = (platform: string, field: 'url' | 'handle', value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [platform]: {
        ...(prev[platform] || { url: '', handle: '' }),
        [field]: value,
      },
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    Object.keys(formValues).forEach((platform) => {
      const { url, handle } = formValues[platform];
      updateSocialLink(platform, {
        url: url.trim(),
        handle: handle.trim(),
      });
    });

    setSavedStatus('All account links updated successfully!');
    setTimeout(() => {
      setSavedStatus(null);
      closeEditor();
    }, 1200);
  };

  // Helper icons/badges
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return (
          <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.216.353-.675.467-1.028.251-2.817-1.722-6.363-2.112-10.54-1.157-.403.092-.803-.16-.895-.563-.092-.403.16-.803.563-.895 4.57-1.044 8.489-.606 11.649 1.336.353.216.467.675.251 1.028zm1.47-3.268c-.272.443-.852.585-1.295.313-3.224-1.982-8.14-2.556-11.954-1.398-.498.151-1.031-.132-1.182-.63-.151-.498.132-1.031.63-1.182 4.364-1.325 9.794-.683 13.488 1.587.443.272.585.852.313 1.295zm.126-3.41c-3.864-2.294-10.244-2.506-13.93-1.387-.594.18-1.223-.153-1.403-.747-.18-.594.153-1.223.747-1.403 4.237-1.286 11.282-1.044 15.727 1.593.535.317.711 1.009.394 1.544-.317.535-1.009.711-1.544.394z"/>
          </svg>
        );
      case 'youtube music':
      case 'youtube':
        return (
          <svg className="w-5 h-5 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'soundcloud':
        return (
          <svg className="w-5 h-5 text-[#FF5500]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.175 12.225c-.051 0-.094.045-.101.1l-.315 2.879c-.01.076.04.143.114.146l.302.01c.058 0 .108-.045.115-.106l.315-2.879a.125.125 0 0 0-.115-.15zm1.536-.788c-.067 0-.126.052-.132.122l-.462 4.444c-.01.087.052.164.137.167l.386.012c.075 0 .137-.058.145-.133l.462-4.444c.007-.09-.057-.168-.136-.168zm1.616-.838c-.085 0-.154.067-.161.155l-.467 6.104c-.007.098.067.181.164.184l.432.014c.092 0 .167-.073.174-.167l.467-6.104c.007-.101-.067-.186-.165-.186zm1.666-.089c-.1 0-.183.08-.19.186l-.426 6.368c-.007.108.077.2.187.202l.462.015c.105 0 .19-.085.197-.193l.426-6.368c.007-.113-.076-.208-.186-.21zm1.688.528c-.114 0-.21.096-.217.218l-.348 5.688c-.007.119.086.219.208.221l.487.016c.117 0 .214-.097.221-.219l.348-5.688c.007-.126-.085-.231-.208-.236zm1.705.908c-.126 0-.231.107-.238.241l-.229 4.779c-.007.13.095.238.229.24l.498.016c.129 0 .235-.107.242-.241l.229-4.779c.007-.137-.094-.251-.231-.256zm12.614-2.822c-.675 0-1.309.215-1.834.577a5.53 5.53 0 0 0-5.328-3.925c-.569 0-1.116.086-1.633.245-.262.08-.344.256-.344.475v10.354c0 .307.25.556.556.556h8.583c2.757 0 5-2.243 5-5 0-2.757-2.243-5-5-5z"/>
          </svg>
        );
      default:
        return <Music className="w-5 h-5 text-[#FF1688]" />;
    }
  };

  // Focus primary platforms requested by the user
  const primaryPlatforms = ['YouTube', 'Spotify', 'Instagram', 'SoundCloud'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d0d11] border border-[#C7C9CE]/25 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#C7C9CE]/15 bg-[#121217]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF1688]/15 border border-[#FF1688]/30 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-[#FF1688]" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-[#F2EEE9]">Connect Official Channels & Streaming</h3>
              <p className="text-xs text-[#C7C9CE]/70 font-mono">
                Link your YouTube Music, Spotify, Instagram & audio profiles
              </p>
            </div>
          </div>
          <button
            onClick={closeEditor}
            className="p-1.5 text-[#C7C9CE]/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Notice */}
        <div className="px-5 py-3 bg-[#171720] border-b border-[#C7C9CE]/10 flex items-start gap-3 text-xs text-[#C7C9CE]/90">
          <Sparkles className="w-4 h-4 text-[#FF1688] shrink-0 mt-0.5" />
          <div>
            Paste your exact profile or artist links below. They update across your site instantly and are preserved automatically. You can also share the links with me in chat anytime!
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSaveAll} className="p-5 overflow-y-auto space-y-6 flex-1">
          {primaryPlatforms.map((platformName) => {
            const data =
              formValues[platformName] ||
              formValues[platformName + ' Music'] ||
              Object.entries(formValues).find(([k]) => k.toLowerCase().includes(platformName.toLowerCase()))?.[1] ||
              { url: '', handle: '' };
            const isHighlight =
              selectedPlatformToEdit &&
              selectedPlatformToEdit.toLowerCase() === platformName.toLowerCase();

            return (
              <div
                key={platformName}
                className={`p-4 bg-[#08080a] border transition-all ${
                  isHighlight
                    ? 'border-[#FF1688] ring-1 ring-[#FF1688]/40 bg-[#120e15]'
                    : 'border-[#C7C9CE]/15 hover:border-[#C7C9CE]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {getPlatformIcon(platformName)}
                    <span className="text-sm font-semibold text-[#F2EEE9] font-mono uppercase tracking-wider">
                      {platformName}
                    </span>
                  </div>

                  {data.url && (
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[11px] font-mono text-[#FF1688] hover:underline"
                    >
                      <span>Test Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <label className="block text-[10px] font-mono tracking-widest text-[#C7C9CE]/70 uppercase mb-1">
                      Account / Profile URL
                    </label>
                    <input
                      type="url"
                      value={data.url}
                      onChange={(e) => handleInputChange(platformName, 'url', e.target.value)}
                      placeholder={
                        platformName === 'YouTube' || platformName === 'YouTube Music'
                          ? 'https://youtube.com/@rebexxxe'
                          : platformName === 'Spotify'
                          ? 'https://open.spotify.com/artist/...'
                          : platformName === 'Instagram'
                          ? 'https://instagram.com/rebabesss'
                          : 'https://soundcloud.com/...'
                      }
                      className="w-full bg-[#141419] border border-[#C7C9CE]/25 px-3 py-2 text-xs text-[#F2EEE9] placeholder-[#C7C9CE]/30 focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-mono tracking-widest text-[#C7C9CE]/70 uppercase mb-1">
                      Display Handle / Name
                    </label>
                    <input
                      type="text"
                      value={data.handle}
                      onChange={(e) => handleInputChange(platformName, 'handle', e.target.value)}
                      placeholder={
                        platformName === 'Instagram'
                          ? '@rebabesss'
                          : platformName === 'YouTube'
                          ? '@rebexxxe'
                          : 'REBEXXX'
                      }


                      className="w-full bg-[#141419] border border-[#C7C9CE]/25 px-3 py-2 text-xs text-[#F2EEE9] placeholder-[#C7C9CE]/30 focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>
                </div>
              </div>
            );
          })}


          {/* Feedback banner */}
          {savedStatus && (
            <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs font-mono">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{savedStatus}</span>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#C7C9CE]/15">
            <button
              type="button"
              onClick={closeEditor}
              className="px-4 py-2 text-xs font-mono text-[#C7C9CE]/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF1688] hover:bg-[#ff2d97] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#FF1688]/20 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Connected Accounts</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
