import React from 'react';
import { Hero } from '@/app/components/hero';
import { InteractiveBook } from '@/app/components/interactive-book';
import { FloatingElements } from '@/app/components/floating-elements';
import { AudioPlayer } from '@/app/components/audio-player';
import { PhotoGallery } from '@/app/components/photo-gallery';
import { Loader } from '@/app/components/loader';
import { ShareButton } from '@/app/components/share-button';
import { CreditButton } from '@/app/components/credit-button';

const App = () => {
  return (
    <div className="min-h-screen bg-[var(--color-ivoire)] selection:bg-[var(--color-rose-poudre)] selection:text-white overflow-x-hidden">
      <Loader />
      <ShareButton />
      <CreditButton />
      {/* Background Petals/Leaves */}
      <FloatingElements />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        
        <div className="max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-10 -mt-10 md:-mt-20">
            <InteractiveBook />
        </div>

        <PhotoGallery />
      </main>

      {/* Music Control */}
      <AudioPlayer />

      {/* Footer */}
      <footer className="relative z-10 py-20 text-center">
        <p className="font-['Poppins'] text-sm text-gray-400">
            Fait avec amour pour EUNICE — 2026
        </p>
      </footer>
    </div>
  );
};

export default App;
