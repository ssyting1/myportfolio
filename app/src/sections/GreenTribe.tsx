import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { greenTribeConfig } from '@/config';
import TariffCalculator from '@/components/TariffCalculator';

gsap.registerPlugin(ScrollTrigger);

const GreenTribe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Null check: if config is empty, return null
  if (!greenTribeConfig.sectionTitle && greenTribeConfig.members.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.tribe-card');
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
                trigger: card,
                start: 'top 92%',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="side-project" className="relative py-14 sm:py-16 lg:py-20 bg-brand-linen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl text-brand-text">
            {greenTribeConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-sm sm:text-base text-brand-dark-gray mt-3 sm:mt-4 max-w-2xl mx-auto">
            {greenTribeConfig.sectionDescription}
          </p>
        </div>

        {/* Working Calculator */}
        <div className="mb-10 sm:mb-12">
          <TariffCalculator />
        </div>

        {/* Architecture Cards - Compact Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {greenTribeConfig.members.map((member) => (
            <article
              key={member.id}
              className="tribe-card bg-white p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-oswald font-medium text-sm sm:text-base text-brand-text">
                    {member.name}
                  </h4>
                  <span className="font-roboto text-xs text-brand-light-gray">
                    {member.role}
                  </span>
                </div>
              </div>

              <h3 className="font-oswald font-light text-base sm:text-lg text-brand-text mb-2">
                {member.title}
              </h3>

              <p className="font-roboto text-xs sm:text-sm text-brand-dark-gray leading-relaxed">
                {member.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GreenTribe;
