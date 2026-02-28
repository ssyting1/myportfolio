import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Null check: if config is empty, return null
  if (!heroConfig.titleLine1 && !heroConfig.titleLine2) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Initial entry animation
      const entryTl = gsap.timeline({ delay: 0.3 });

      // Image 3D unfold
      entryTl.fromTo(
        imageContainerRef.current,
        { rotateX: 90, opacity: 0, transformOrigin: 'bottom center' },
        { rotateX: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
      );

      // Title mask reveal
      entryTl.fromTo(
        titleRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, ease: 'power4.out' },
        '-=0.8'
      );

      // Content blur fade in
      entryTl.fromTo(
        contentRef.current,
        { filter: 'blur(10px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, duration: 0.6, ease: 'none' },
        '-=0.4'
      );

      // Date vertical slide
      entryTl.fromTo(
        dateRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      // Scroll-triggered parallax (desktop only)
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (!isTouch) {
        gsap.to(imageRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Liquid distortion effect on mouse move (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      rotateY: x * 3,
      rotateX: -y * 3,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 lg:pb-16 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-8 items-center">
          {/* Left: Image with 3D perspective */}
          <div
            ref={imageContainerRef}
            className="relative order-2 lg:order-1"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <img
                ref={imageRef}
                src={heroConfig.image}
                alt={heroConfig.imageAlt}
                className="w-full h-auto max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] mx-auto aspect-square object-cover rounded-lg shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Date badge */}
            <div ref={dateRef} className="mb-2">
              <span className="inline-block px-3 py-1 bg-brand-text text-brand-linen text-xs font-roboto tracking-wider rounded-full">
                {heroConfig.date}
              </span>
            </div>

            <div className="mb-4 lg:mb-5">
              <h1
                ref={titleRef}
                className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl text-brand-text leading-[1.15] tracking-tight pb-1"
              >
                {heroConfig.titleLine1}
                <br />
                <span className="font-medium">{heroConfig.titleLine2}</span>
              </h1>
            </div>

            <div ref={contentRef} className="mt-1">
              <p className="font-roboto text-xs text-brand-dark-gray mb-1 uppercase tracking-wider">
                {heroConfig.readTime}
              </p>

              <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed mb-4 lg:mb-5 max-w-md">
                {heroConfig.description}
              </p>

              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-text text-brand-linen font-roboto text-sm uppercase tracking-wider rounded-sm hover:bg-brand-dark-gray transition-colors"
              >
                <span>{heroConfig.ctaText}</span>
                <ArrowRight size={14} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
