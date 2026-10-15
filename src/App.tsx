import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MusicSection } from './components/MusicSection';
import { VisualJournal } from './components/VisualJournal';
import { WordsSection } from './components/WordsSection';
import { MailingListSection } from './components/MailingListSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { ImageProvider } from './context/ImageContext';
import { SocialProvider } from './context/SocialContext';
import { SocialAccountsModal } from './components/SocialAccountsModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Handle smooth navigation to sections
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Observe active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'music', 'visuals', 'words', 'mailing-list', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ImageProvider>
      <SocialProvider>
        <div className="min-h-screen bg-[#080808] text-[#F2EEE9] selection:bg-[#FF1688] selection:text-white relative">
          {/* Top Navigation Bar */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Main Content Sections */}
          <main>
            {/* Hero Section */}
            <Hero
              onEnterWorld={() => handleNavigate('about')}
              onExploreMusic={() => handleNavigate('music')}
            />

            {/* About Section */}
            <AboutSection />

            {/* Music Archive & Web Audio Synthesizer */}
            <MusicSection />

            {/* Visual Journal & Multidisciplinary Art */}
            <VisualJournal />

            {/* Words & Songwriting Notebooks */}
            <WordsSection />

            {/* Mailing List / Letters */}
            <MailingListSection />

            {/* Contact & Bookings */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Persistent Audio Player Dock */}
          <AudioPlayerDock onOpenMusic={() => handleNavigate('music')} />

          {/* Social Accounts & Streaming Link Manager Modal */}
          <SocialAccountsModal />
        </div>
      </SocialProvider>
    </ImageProvider>
  );
}

