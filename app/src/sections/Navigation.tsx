import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, Menu } from 'lucide-react';
import { navigationConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);

  // Null check: if config is empty, return null
  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initial animation
    const tl = gsap.timeline();

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, rotation: -5, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
    );

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      tl.fromTo(
        links,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      );
    }

    // Scroll trigger for compact mode
    const trigger = ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 100);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchOverlayRef.current) {
      gsap.fromTo(
        searchOverlayRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.4, ease: 'power3.out' }
        );
        // Animate menu items
        const items = mobileMenuRef.current.querySelectorAll('.mobile-menu-item');
        gsap.fromTo(
          items,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
        );
      } else {
        gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
      }
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'py-3 bg-background/90 backdrop-blur-md border-b border-border/30 shadow-sm'
            : 'py-4 lg:py-6'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            {/* Logo */}
            <div
              ref={logoRef}
              className={`font-oswald font-light tracking-widest transition-all duration-500 flex-shrink-0 ${
                isScrolled ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'
              }`}
            >
              <a href="#" className="text-brand-text hover:text-brand-dark-gray transition-colors">
                {navigationConfig.brandName}
              </a>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <div
              ref={linksRef}
              className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1"
            >
              {navigationConfig.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-roboto text-sm tracking-wider uppercase text-brand-dark-gray hover:text-brand-text transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-text transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-brand-dark-gray hover:text-brand-text transition-colors"
                aria-label={navigationConfig.searchAriaLabel}
              >
                <Search size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden ml-auto">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-brand-dark-gray hover:text-brand-text transition-colors"
                aria-label={navigationConfig.searchAriaLabel}
              >
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-brand-dark-gray hover:text-brand-text transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-background lg:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col items-center justify-center h-full px-8">
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="mobile-menu-item font-oswald font-light text-4xl sm:text-5xl text-brand-text hover:text-brand-dark-gray transition-colors py-4"
              style={{ opacity: 0 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          ref={searchOverlayRef}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-brand-text hover:text-brand-dark-gray transition-colors"
            aria-label={navigationConfig.closeSearchAriaLabel}
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-2xl px-6">
            <input
              type="text"
              placeholder={navigationConfig.searchPlaceholder}
              className="w-full bg-transparent border-b-2 border-brand-text py-4 text-2xl sm:text-3xl lg:text-5xl font-oswald font-light placeholder:text-brand-light-gray focus:outline-none"
              autoFocus
            />
            <p className="mt-4 text-base text-brand-dark-gray">
              {navigationConfig.searchHint}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
