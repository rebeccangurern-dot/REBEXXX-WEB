import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { storeArtworkImage, getStoredArtworkImage, removeStoredArtworkImage, processImageFile } from '../utils/imageStorage';

interface ImageContextType {
  artistImage: string;
  hasCustomImage: boolean;
  setArtistImageFile: (file: File) => void;
  resetToDefault: () => void;
  triggerFileSelect: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const STORAGE_KEY = 'rebexxx_official_original_image';
const DEFAULT_IMAGE_FALLBACK = '/images/rebexxx_official_portrait_1791896808320.jpg';

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artistImage, setArtistImage] = useState<string>(DEFAULT_IMAGE_FALLBACK);
  const [hasCustomImage, setHasCustomImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const saved = await getStoredArtworkImage(STORAGE_KEY);
        if (saved) {
          setArtistImage(saved);
          setHasCustomImage(true);
        } else {
          setArtistImage(DEFAULT_IMAGE_FALLBACK);
        }
      } catch {
        setArtistImage(DEFAULT_IMAGE_FALLBACK);
      }
    })();
  }, []);

  const setArtistImageFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      const dataUrl = await processImageFile(file);
      setArtistImage(dataUrl);
      setHasCustomImage(true);
      await storeArtworkImage(STORAGE_KEY, dataUrl);
    } catch (err) {
      console.warn('Image processing error:', err);
    }
  };

  const resetToDefault = async () => {
    await removeStoredArtworkImage(STORAGE_KEY);
    setHasCustomImage(false);
    setArtistImage(DEFAULT_IMAGE_FALLBACK);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <ImageContext.Provider
      value={{
        artistImage,
        hasCustomImage,
        setArtistImageFile,
        resetToDefault,
        triggerFileSelect,
        fileInputRef,
      }}
    >
      {/* Hidden file input for direct selection of the original file */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setArtistImageFile(file);
          }
        }}
      />
      {children}
    </ImageContext.Provider>
  );
};

export const useArtistImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useArtistImage must be used within an ImageProvider');
  }
  return context;
};
