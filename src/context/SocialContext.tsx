import React, { createContext, useContext, useState, useEffect } from 'react';
import { SOCIAL_LINKS as DEFAULT_SOCIAL_LINKS } from '../data/artistData';
import { SocialLink } from '../types';

interface SocialContextType {
  socialLinks: SocialLink[];
  updateSocialLink: (platform: string, updates: Partial<SocialLink>) => void;
  getLink: (platform: string) => SocialLink | undefined;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  selectedPlatformToEdit: string | null;
  openEditorForPlatform: (platform?: string) => void;
  closeEditor: () => void;
  resetToDefaults: () => void;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'rebexxx_social_accounts_v4';

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('rebexxx_social_accounts_v3') ||
        localStorage.getItem('rebexxx_social_accounts_v2') ||
        localStorage.getItem('rebexxx_social_accounts_v1');
      if (stored) {
        const parsed: SocialLink[] = JSON.parse(stored);
        const merged = DEFAULT_SOCIAL_LINKS.map((def) => {
          const match = parsed.find(
            (p) =>
              p.platform.toLowerCase() === def.platform.toLowerCase() ||
              (p.platform.toLowerCase().includes('youtube') && def.platform.toLowerCase().includes('youtube'))
          );
          if (!match) return def;

          // If Spotify, ensure placeholder or generic open.spotify.com defaults to Coming Soon
          if (def.platform.toLowerCase() === 'spotify') {
            if (!match.url || match.url === 'https://open.spotify.com' || !match.url.includes('/artist/')) {
              return def;
            }
          }

          // If the match was the previous placeholder Instagram, update to Rebecca's official handle
          if (def.platform.toLowerCase() === 'instagram' && (match.handle.includes('rebexxx') || match.url.includes('rebexxx.official'))) {
            return def;
          }

          // If the match was the placeholder YouTube, update to Rebecca's official channel
          if (def.platform.toLowerCase().includes('youtube') && (!match.url.includes('@rebexxxe') || match.handle === 'REBEXXX')) {
            return def;
          }

          return { ...def, ...match };
        });
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse stored social links:', e);
    }
    return DEFAULT_SOCIAL_LINKS;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPlatformToEdit, setSelectedPlatformToEdit] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(socialLinks));
    } catch (e) {
      console.warn('Failed to persist social links:', e);
    }
  }, [socialLinks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const updateSocialLink = (platform: string, updates: Partial<SocialLink>) => {
    const target = platform.toLowerCase();
    setSocialLinks((prev) =>
      prev.map((item) => {
        const p = item.platform.toLowerCase();
        if (p === target || (target.includes('youtube') && p.includes('youtube'))) {
          const isSpotify = p === 'spotify';
          const newStatus = isSpotify
            ? (updates.url && updates.url.includes('/artist/') ? 'Active' : (updates.url ? 'Active' : 'Coming Soon'))
            : (updates.url ? 'Active' : item.status);
          return { ...item, ...updates, status: updates.status || newStatus };
        }
        return item;
      })
    );
  };

  const getLink = (platform: string) => {
    const target = platform.toLowerCase();
    return socialLinks.find((l) => {
      const p = l.platform.toLowerCase();
      return p === target || (target.includes('youtube') && p.includes('youtube'));
    });
  };

  const openEditorForPlatform = (platform?: string) => {
    setSelectedPlatformToEdit(platform || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setSelectedPlatformToEdit(null);
  };

  const resetToDefaults = () => {
    setSocialLinks(DEFAULT_SOCIAL_LINKS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <SocialContext.Provider
      value={{
        socialLinks,
        updateSocialLink,
        getLink,
        isEditorOpen,
        setIsEditorOpen,
        selectedPlatformToEdit,
        openEditorForPlatform,
        closeEditor,
        resetToDefaults,
        showToast,
      }}
    >
      {children}
      {/* Sleek Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] max-w-md w-[92%] sm:w-auto bg-[#101015] border border-amber-500/40 text-[#F2EEE9] px-4 py-3 shadow-2xl flex items-center justify-between gap-3 text-xs font-mono animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#C7C9CE]/50 hover:text-white p-1 text-xs"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </SocialContext.Provider>
  );
};

export const useSocials = (): SocialContextType => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocials must be used within a SocialProvider');
  }
  return context;
};
