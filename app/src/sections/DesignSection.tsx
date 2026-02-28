import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { designConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const DesignSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Null check: if config is empty, return null
  if (!designConfig.sectionTitle && designConfig.items.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 88%',
          },
        }
      );

      // Cascade reveal for grid items
      const gridItems = gridRef.current?.querySelectorAll('.design-tile');
      if (gridItems) {
        gridItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 92%',
              },
              delay: (index % 2) * 0.08,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTileHover = (id: number | null) => {
    setHoveredItem(id);
  };

  return (
    <section ref={sectionRef} id="experience" className="relative py-16 sm:py-20 lg:py-24 bg-brand-linen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-oswald font-light text-4xl sm:text-5xl lg:text-6xl text-brand-text">
            {designConfig.sectionTitle}
          </h2>
        </div>

        {/* Grid - 1 column on mobile, 2 columns on tablet+ */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {designConfig.items.map((item) => (
            <div
              key={item.id}
              className="design-tile group relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              onMouseEnter={() => handleTileHover(item.id)}
              onMouseLeave={() => handleTileHover(null)}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image - Logo container with padding */}
                <div className="relative w-full sm:w-[140px] lg:w-[160px] aspect-video sm:aspect-square flex-shrink-0 overflow-hidden bg-white flex items-center justify-center p-4 sm:p-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-contain transition-all duration-500 ease-out ${
                      hoveredItem === item.id
                        ? 'grayscale-0 scale-105'
                        : 'grayscale scale-100'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                  <h3 className="font-oswald font-medium text-base sm:text-lg lg:text-xl text-brand-text mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  {item.quote && (
                    <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed">
                      {item.quote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link - Only show if text exists */}
        {designConfig.viewMoreText && (
          <div className="mt-10 sm:mt-12 text-center">
            <a
              href="#"
              className="inline-block font-roboto text-base uppercase tracking-widest text-brand-dark-gray hover:text-brand-text transition-colors relative group"
            >
              {designConfig.viewMoreText}
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-text transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignSection;
