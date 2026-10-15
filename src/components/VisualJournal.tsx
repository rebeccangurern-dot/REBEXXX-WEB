import React, { useState, useEffect, useRef } from 'react';
import { VISUAL_JOURNAL, PINTEREST_BOARDS } from '../data/artistData';
import { VisualEntry, PinterestBoard } from '../types';
import { X, ZoomIn, ExternalLink, Plus, Pin, Sparkles, Check, Palette, Upload, Image as ImageIcon, RotateCcw, Link2, Edit3, Loader2 } from 'lucide-react';
import { storeArtworkImage, getStoredArtworkImage, removeStoredArtworkImage, processImageFile } from '../utils/imageStorage';

export const VisualJournal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxEntry, setLightboxEntry] = useState<VisualEntry | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  
  // Official Pinterest boards: 2026 becoming, BDD, Girl, Rebecca voyage
  const [pinterestBoards, setPinterestBoards] = useState<PinterestBoard[]>(() => {
    try {
      const savedUrls = localStorage.getItem('rebexxx_pinterest_board_urls');
      if (savedUrls) {
        const urlMap: Record<string, string> = JSON.parse(savedUrls);
        return PINTEREST_BOARDS.map((b) => (urlMap[b.id] ? { ...b, url: urlMap[b.id] } : b));
      }
    } catch {}
    return PINTEREST_BOARDS;
  });

  const [editingBoard, setEditingBoard] = useState<{ id: string; title: string; url: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [customPaintingImages, setCustomPaintingImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('rebexxx_custom_paintings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Load any previously saved high-res painting files from IndexedDB
  useEffect(() => {
    (async () => {
      try {
        const p1 = await getStoredArtworkImage('rebexxx_painting_vis-painting-01');
        const p2 = await getStoredArtworkImage('rebexxx_painting_vis-painting-02');
        if (p1 || p2) {
          setCustomPaintingImages((prev) => ({
            ...prev,
            ...(p1 ? { 'vis-painting-01': p1 } : {}),
            ...(p2 ? { 'vis-painting-02': p2 } : {}),
          }));
        }
      } catch {}
    })();
  }, []);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [newBoard, setNewBoard] = useState({
    title: '',
    subtitle: '',
    url: '',
    curatorNotes: '',
  });
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSaveBoardUrl = (boardId: string, newUrl: string) => {
    const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    const updated = pinterestBoards.map((b) => (b.id === boardId ? { ...b, url: formattedUrl } : b));
    setPinterestBoards(updated);
    try {
      const urlMap: Record<string, string> = {};
      updated.forEach((b) => {
        urlMap[b.id] = b.url;
      });
      localStorage.setItem('rebexxx_pinterest_board_urls', JSON.stringify(urlMap));
    } catch {}
    setEditingBoard(null);
  };

  const handleAddBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoard.title || !newBoard.url) return;

    const boardToAdd: PinterestBoard = {
      id: `pin-custom-${Date.now()}`,
      title: newBoard.title,
      subtitle: newBoard.subtitle || 'Personal Moodboard',
      url: newBoard.url.startsWith('http') ? newBoard.url : `https://${newBoard.url}`,
      coverImage: '/images/rebexxx_hero_visual_1791886055055.jpg',
      curatorNotes: newBoard.curatorNotes || 'Curated aesthetic inspirations for REBEXXX.',
    };

    const updated = [...pinterestBoards, boardToAdd];
    setPinterestBoards(updated);

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setShowAddModal(false);
      setNewBoard({ title: '', subtitle: '', url: '', curatorNotes: '' });
      setActiveCategory('Moodboards & Pinterest');
    }, 1200);
  };

  const handleUploadPainting = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingId(id);
      const optimizedDataUrl = await processImageFile(file);
      const next = { ...customPaintingImages, [id]: optimizedDataUrl };
      setCustomPaintingImages(next);
      await storeArtworkImage(`rebexxx_painting_${id}`, optimizedDataUrl);
      try {
        localStorage.setItem('rebexxx_custom_paintings', JSON.stringify(next));
      } catch {}
    } catch (err) {
      console.error('Error saving painting photo:', err);
    } finally {
      setUploadingId(null);
    }
  };

  const handleResetPaintingImage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = { ...customPaintingImages };
    delete next[id];
    setCustomPaintingImages(next);
    await removeStoredArtworkImage(`rebexxx_painting_${id}`);
    try {
      localStorage.setItem('rebexxx_custom_paintings', JSON.stringify(next));
    } catch {}
  };

  const categories = ['All', 'Paintings', 'Studio Journal', 'Moodboards & Pinterest'];

  const filteredVisuals =
    activeCategory === 'All'
      ? VISUAL_JOURNAL
      : activeCategory === 'Moodboards & Pinterest'
      ? VISUAL_JOURNAL.filter((e) => e.category === 'Moodboards')
      : VISUAL_JOURNAL.filter((e) => e.category === activeCategory);

  return (
    <section id="visuals" className="relative py-24 sm:py-32 bg-[#080808] border-t border-[#C7C9CE]/15">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#4A1026]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#243DCC]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#FF1688]">
              <span>VISUAL JOURNAL & FINE ART</span>
              <span aria-hidden="true">/</span>
              <span className="text-[#C7C9CE]/70">THE HUE OF BLUE & STUDIO VAULT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F2EEE9] font-normal leading-tight">
              An Independent Art Publication.
            </h2>
            <p className="text-base text-[#C7C9CE]/90 font-light leading-relaxed">
              Fine art oil paintings on huge canvases, documentary studio journals, and Pinterest moodboards documenting the multidisciplinary world of REBEXXX.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#FF1688] hover:bg-[#ff2d97] text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#FF1688]/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>LINK A PINTEREST BOARD</span>
            </button>
          </div>
        </div>

        {/* Filter Segmented Control (Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#C7C9CE]/15">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-colors border ${
                activeCategory === cat
                  ? 'bg-[#F2EEE9] text-[#080808] border-[#F2EEE9] font-bold'
                  : 'bg-transparent text-[#C7C9CE]/70 border-[#C7C9CE]/20 hover:border-[#C7C9CE]/50 hover:text-[#F2EEE9]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* The Hue of Blue and The Blues Collection Feature */}
        {(activeCategory === 'All' || activeCategory === 'Paintings') && (
          <div className="mb-12 p-6 sm:p-8 bg-[#0a0e1a] border border-[#243DCC]/40 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#243DCC]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#4A72FF] tracking-[0.2em]">
                <Palette className="w-4 h-4" />
                <span className="font-bold">CURRENT COLLECTION IN PROGRESS</span>
                <span className="text-[#C7C9CE]/40">·</span>
                <span className="text-[#C7C9CE]/80">HUGE CANVASES & OIL PAINT</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#F2EEE9]">
                “THE HUE OF BLUE AND THE BLUES”
              </h3>
              <p className="text-sm sm:text-base text-[#C7C9CE]/95 font-light max-w-3xl leading-relaxed italic border-l-2 border-[#243DCC] pl-4">
                “A lot of inspiration is taken from the color blue and how it mixes with other colors to bring forth emotion. Huge canvases and oil paint. A lot of this came forth after a dark time, where I channeled my feelings to my canvas and brought forth this collection.”
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#C7C9CE]/70">
                <span className="text-[#F2EEE9]">2 ORIGINAL PAINTINGS EXHIBITED</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">PERMANENT GALLERY ARCHIVE</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={uploadingId === 'vis-painting-01'}
                  onClick={() => fileInputRefs.current['vis-painting-01']?.click()}
                  className="px-4 py-2 bg-[#243DCC] hover:bg-[#3452f0] text-white text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-md shadow-[#243DCC]/30 cursor-pointer"
                >
                  {uploadingId === 'vis-painting-01' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Upload className="w-3.5 h-3.5" />
                  )}
                  <span>
                    UPDATE CANVAS I PHOTO
                  </span>
                </button>
                <button
                  type="button"
                  disabled={uploadingId === 'vis-painting-02'}
                  onClick={() => fileInputRefs.current['vis-painting-02']?.click()}
                  className="px-4 py-2 bg-[#0c132c] border border-[#4A72FF]/50 hover:border-[#4A72FF] text-[#F2EEE9] hover:text-white text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  {uploadingId === 'vis-painting-02' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4A72FF]" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 text-[#4A72FF]" />
                  )}
                  <span>
                    UPDATE CANVAS II PHOTO
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pinterest Boards Grid (Shown in All or Moodboards & Pinterest) */}
        {(activeCategory === 'All' || activeCategory === 'Moodboards & Pinterest') && (
          <div className="mb-14">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C7C9CE]/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                <Pin className="w-4 h-4" />
                <span className="font-bold tracking-widest">OFFICIAL PINTEREST BOARDS</span>
                <span className="text-[#C7C9CE]/40">·</span>
                <span className="text-[#C7C9CE]/80">VISUAL MOOD ARCHIVES</span>
              </div>
              <span className="text-xs font-mono text-[#C7C9CE]/50">
                {pinterestBoards.length} BOARDS CONNECTED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pinterestBoards.map((board) => (
                <div
                  key={board.id}
                  className="bg-[#0c0c0f] border border-[#C7C9CE]/20 p-5 flex flex-col justify-between space-y-4 hover:border-[#FF1688]/60 transition-all shadow-xl group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#FF1688]">
                      <span>PINTEREST MOODBOARD</span>
                      <Pin className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="text-lg font-serif text-[#F2EEE9] group-hover:text-[#FF1688] transition-colors">
                      {board.title}
                    </h3>
                    <p className="text-xs text-[#C7C9CE]/90 font-light leading-relaxed pt-1">
                      {board.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#C7C9CE]/10">
                    <a
                      href={board.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-3 bg-[#080808] border border-[#C7C9CE]/30 hover:border-[#FF1688] text-xs font-mono text-[#F2EEE9] hover:text-[#FF1688] flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>VIEW ON PINTEREST</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setEditingBoard({ id: board.id, title: board.title, url: board.url })}
                      className="w-full py-1.5 text-[11px] font-mono text-[#C7C9CE]/60 hover:text-[#FF1688] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>CUSTOMIZE LINK</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick URL Edit Modal */}
            {editingBoard && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Edit Pinterest URL"
                className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4"
              >
                <div className="relative max-w-md w-full bg-[#0c0c0f] border border-[#FF1688]/40 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                      <Pin className="w-4 h-4" />
                      <span>UPDATE PINTEREST LINK</span>
                    </div>
                    <button
                      onClick={() => setEditingBoard(null)}
                      className="text-[#C7C9CE] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-lg font-serif text-[#F2EEE9] mb-1">
                    {editingBoard.title}
                  </h4>
                  <p className="text-xs text-[#C7C9CE]/70 font-light mb-4">
                    Paste your personal Pinterest board URL below to link visitors directly to your board.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveBoardUrl(editingBoard.id, editingBoard.url);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] font-mono text-[#C7C9CE]/70 mb-1">
                        PINTEREST URL
                      </label>
                      <input
                        type="text"
                        required
                        value={editingBoard.url}
                        onChange={(e) => setEditingBoard({ ...editingBoard, url: e.target.value })}
                        placeholder="https://pinterest.com/username/board-name"
                        className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-3 py-2 text-xs text-[#F2EEE9] focus:outline-none focus:border-[#FF1688]"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#FF1688] hover:bg-[#ff2f96] text-white text-xs font-mono font-bold tracking-wider transition-colors"
                      >
                        SAVE LINK
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBoard(null)}
                        className="px-4 py-2 border border-[#C7C9CE]/30 text-xs font-mono text-[#C7C9CE] hover:text-white transition-colors"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Visual Monograph Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredVisuals.map((entry, idx) => {
            const isPainting = entry.category === 'Paintings';
            const displayImage = customPaintingImages[entry.id] || entry.imageSrc;
            const hasCustomPhoto = Boolean(customPaintingImages[entry.id]);

            return (
              <div
                key={entry.id}
                className="group relative bg-[#0a0a0d] border border-[#C7C9CE]/20 overflow-hidden flex flex-col justify-between transition-all hover:border-[#FF1688]/60 shadow-xl"
              >
                {/* Top Editorial Kicker & Unboxed Metadata */}
                <div className="p-4 bg-[#080808]/90 border-b border-[#C7C9CE]/10 flex items-center justify-between text-xs text-[#C7C9CE]/70 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF1688] font-semibold">{entry.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{entry.year}</span>
                  </div>
                  <span className="text-[#C7C9CE]/70">
                    {isPainting
                      ? `CANVAS 0${idx + 1}`
                      : entry.category === 'Studio Journal'
                      ? 'STUDIO JOURNAL'
                      : 'MONOGRAPH'}
                  </span>
                </div>

                {/* Image Frame */}
                <div
                  onClick={() => setLightboxEntry(entry)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer"
                >
                  <img
                    src={displayImage}
                    alt={entry.altText}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = entry.imageSrc;
                    }}
                  />

                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Hover Zoom Hint */}
                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 bg-[#080808]/80 backdrop-blur-sm border border-[#C7C9CE]/30 text-[#F2EEE9] flex items-center gap-1.5 text-xs font-mono">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>VIEW PIECE</span>
                    </div>
                  </div>
                </div>

                {/* Monograph Editorial Text */}
                <div className="p-6 bg-[#0a0a0d] space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#F2EEE9]">
                      {entry.title}
                    </h3>
                  </div>

                  <p className="text-xs font-mono text-[#C7C9CE]/60">
                    MEDIUM: {entry.medium}
                  </p>
                  <p className="text-sm text-[#C7C9CE]/85 font-light leading-relaxed">
                    {entry.caption}
                  </p>

                  {/* If Painting, provide photo upload/replace button */}
                  {isPainting && (
                    <div className="pt-3 border-t border-[#C7C9CE]/10 flex flex-wrap items-center justify-between gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => {
                          fileInputRefs.current[entry.id] = el;
                        }}
                        onChange={(e) => handleUploadPainting(entry.id, e)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={uploadingId === entry.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRefs.current[entry.id]?.click();
                        }}
                        className={`px-4 py-2 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                          hasCustomPhoto
                            ? 'bg-[#0f172a] border border-[#4A72FF] text-[#9db7ff] hover:bg-[#1e293b]'
                            : 'bg-[#243DCC] hover:bg-[#3452f0] text-white shadow-lg shadow-[#243DCC]/30'
                        }`}
                      >
                        {uploadingId === entry.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>SAVING HIGH-RES ART...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>{hasCustomPhoto ? 'REPLACE PAINTING PHOTO' : 'UPLOAD PAINTING PHOTO'}</span>
                          </>
                        )}
                      </button>

                      {hasCustomPhoto && (
                        <button
                          type="button"
                          onClick={(e) => handleResetPaintingImage(entry.id, e)}
                          title="Reset to default picture"
                          className="p-1.5 text-xs text-[#C7C9CE]/50 hover:text-white"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#C7C9CE]/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#C7C9CE]/50">
                      {entry.dimensions || 'Archival Study'}
                    </span>
                    <button
                      onClick={() => setLightboxEntry(entry)}
                      className="text-xs font-mono text-[#FF1688] hover:text-white transition-colors underline underline-offset-4"
                    >
                      READ NOTES →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Link a Pinterest Board */}
        {showAddModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Link Pinterest Board"
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          >
            <div className="relative max-w-lg w-full bg-[#0c0c0f] border border-[#C7C9CE]/30 p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 text-[#C7C9CE] hover:text-white"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688] mb-2">
                <Pin className="w-4 h-4" />
                <span>CONNECT YOUR PINTEREST MOODBOARD</span>
              </div>
              <h3 className="text-2xl font-serif text-[#F2EEE9] mb-4">
                Add Pinterest Board
              </h3>
              <p className="text-xs text-[#C7C9CE]/80 font-light mb-6">
                Paste the link to your Pinterest board or aesthetic profile. It will appear directly in your official visual journal.
              </p>

              {addedSuccess ? (
                <div className="p-6 bg-[#080808] border border-emerald-500/50 text-center space-y-3">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm font-serif text-[#F2EEE9]">
                    Pinterest Board Linked Successfully!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddBoard} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#C7C9CE]/70 mb-1.5">
                      BOARD TITLE *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. REBEXXX Styling & Silhouettes"
                      value={newBoard.title}
                      onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-3.5 py-2.5 text-sm text-[#F2EEE9] focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C7C9CE]/70 mb-1.5">
                      PINTEREST URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://pinterest.com/username/board-name"
                      value={newBoard.url}
                      onChange={(e) => setNewBoard({ ...newBoard, url: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-3.5 py-2.5 text-sm text-[#F2EEE9] focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C7C9CE]/70 mb-1.5">
                      SUBTITLE / FOCUS
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Noir, Latex & Chrome Moodboard"
                      value={newBoard.subtitle}
                      onChange={(e) => setNewBoard({ ...newBoard, subtitle: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-3.5 py-2.5 text-sm text-[#F2EEE9] focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#C7C9CE]/70 mb-1.5">
                      CURATORIAL NOTES
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Short description of the visual references and inspirations in this board..."
                      value={newBoard.curatorNotes}
                      onChange={(e) => setNewBoard({ ...newBoard, curatorNotes: e.target.value })}
                      className="w-full bg-[#080808] border border-[#C7C9CE]/30 px-3.5 py-2.5 text-sm text-[#F2EEE9] focus:outline-none focus:border-[#FF1688]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF1688] hover:bg-[#ff2d97] text-white text-xs font-mono font-bold tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <span>SAVE BOARD TO MOODBOARDS</span>
                    <Pin className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxEntry && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxEntry.title}
            className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in"
          >
            <div className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto bg-[#0a0a0d] border border-[#C7C9CE]/30 shadow-2xl p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={() => setLightboxEntry(null)}
                className="absolute top-4 right-4 p-2.5 text-[#F2EEE9] hover:text-[#FF1688] bg-[#080808] border border-[#C7C9CE]/20 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
                {/* Image High-res view */}
                <div className="lg:col-span-7 bg-black overflow-hidden border border-[#C7C9CE]/15">
                  <img
                    src={customPaintingImages[lightboxEntry.id] || lightboxEntry.imageSrc}
                    alt={lightboxEntry.altText}
                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = lightboxEntry.imageSrc;
                    }}
                  />
                </div>

                {/* Detailed Monograph Information */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#FF1688]">
                      <span>{lightboxEntry.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{lightboxEntry.year}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#F2EEE9] mt-2">
                      {lightboxEntry.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-[#C7C9CE]/70 border-y border-[#C7C9CE]/10 py-3">
                    <div><strong className="text-[#F2EEE9]">MEDIUM:</strong> {lightboxEntry.medium}</div>
                    {lightboxEntry.dimensions && (
                      <div><strong className="text-[#F2EEE9]">SCALE:</strong> {lightboxEntry.dimensions}</div>
                    )}
                    <div><strong className="text-[#F2EEE9]">LOCATION:</strong> Nairobi Studio Archive</div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono text-[#C7C9CE]/50 tracking-wider uppercase">
                      Curatorial & Creative Notes
                    </div>
                    <p className="text-sm text-[#F2EEE9]/90 font-light leading-relaxed">
                      {lightboxEntry.notes}
                    </p>
                  </div>

                  <div className="p-3 bg-[#080808] border border-[#C7C9CE]/15 text-xs font-mono text-[#C7C9CE]/60">
                    Artistic direction by REBEXXX. Multi-medium explorations complementing forthcoming audio releases.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
