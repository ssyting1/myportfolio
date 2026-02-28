import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lifestyleConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const LifestyleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Null check: if config is empty, return null
  if (!lifestyleConfig.sectionTitle && lifestyleConfig.articles.length === 0) {
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
        { y: 30, opacity: 0 },
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

      // Cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
              },
              delay: index * 0.08,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header - Just title, no link */}
        <div ref={titleRef} className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="font-oswald font-light text-4xl sm:text-5xl lg:text-6xl text-brand-text">
            {lifestyleConfig.sectionTitle}
          </h2>
        </div>

        {/* Responsive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
        >
          {lifestyleConfig.articles.map((article) => (
            <div
              key={article.id}
              className="skill-card group"
              onMouseEnter={() => setHoveredCard(article.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                      hoveredCard === article.id ? 'scale-105 grayscale-0' : 'scale-100 grayscale'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-oswald font-medium text-base sm:text-lg text-brand-text mb-2">
                    {article.title}
                  </h3>
                  <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
