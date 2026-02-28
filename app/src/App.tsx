import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { siteConfig } from '@/config';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import LatestArticles from '@/sections/LatestArticles';
import ArtCategory from '@/sections/ArtCategory';
import LifestyleSection from '@/sections/LifestyleSection';
import DesignSection from '@/sections/DesignSection';
import DayInLife from '@/sections/DayInLife';
import GreenTribe from '@/sections/GreenTribe';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Set document title and language from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
    if (siteConfig.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', siteConfig.description);
      }
    }
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Handle resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-linen">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero Section - Split Screen Perspective Theater */}
        <HeroSection />

        {/* Art Category - About Me Section */}
        <ArtCategory />

        {/* Latest Articles - Featured Projects */}
        <LatestArticles />

        {/* Lifestyle - Core Competencies */}
        <LifestyleSection />

        {/* Design - Professional Experience */}
        <DesignSection />

        {/* Day in My Life - Product Manager Timeline */}
        <DayInLife />

        {/* Green Tribe - Side Project */}
        <GreenTribe />
      </main>

      {/* Footer - Curtain Reveal */}
      <Footer />
    </div>
  );
}

export default App;
