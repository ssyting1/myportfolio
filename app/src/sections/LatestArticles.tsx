import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { latestArticlesConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const LatestArticles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Null check: if config is empty, return null
  if (!latestArticlesConfig.sectionTitle && latestArticlesConfig.articles.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !gridRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Grid items stagger animation
      const cards = gridRef.current?.querySelectorAll('.article-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 94%',
              },
              delay: (index % 2) * 0.06,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-14 sm:py-16 lg:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="font-oswald font-light text-2xl sm:text-3xl lg:text-4xl text-brand-text">
            {latestArticlesConfig.sectionTitle}
          </h2>
        </div>

        {/* Grid layout - compact 2x2 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
        >
          {latestArticlesConfig.articles.map((article, index) => (
            <div
              key={article.id}
              className={`article-card group transition-all duration-300 ${
                hoveredIndex !== null && hoveredIndex !== index ? 'opacity-70' : 'opacity-100'
              }`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <div className="relative overflow-hidden rounded-sm bg-white shadow-sm">
                <div className="aspect-[3/2] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Subtle overlay on hover */}
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Content - compact */}
              <div className="mt-2 sm:mt-3">
                <span className="font-roboto text-[10px] sm:text-xs uppercase tracking-wider text-brand-light-gray">
                  {article.category}
                </span>
                <h3 className="font-oswald font-medium text-sm sm:text-base text-brand-text mt-0.5 leading-tight">
                  {article.title}
                </h3>
                <p className="font-roboto text-xs sm:text-sm text-brand-dark-gray mt-1 leading-relaxed line-clamp-2">
                  {article.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
