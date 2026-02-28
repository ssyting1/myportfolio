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
    <section ref={sectionRef} id="side-project" className="relative min-h-screen py-16 sm:py-20 lg:py-24 bg-brand-linen flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <h2 className="font-oswald font-light text-4xl sm:text-5xl lg:text-6xl text-brand-text">
            {greenTribeConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-base sm:text-lg lg:text-xl text-brand-dark-gray mt-4 sm:mt-6 max-w-4xl mx-auto leading-relaxed">
            {greenTribeConfig.sectionDescription}
          </p>
        </div>

        {/* Working Calculator */}
        <div className="mb-12 sm:mb-16">
          <TariffCalculator />
        </div>

        {/* Architecture Cards - Compact Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {greenTribeConfig.members.map((member) => (
            <article
              key={member.id}
              className="tribe-card bg-white p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-oswald font-medium text-base sm:text-lg text-brand-text">
                    {member.name}
                  </h4>
                  <span className="font-roboto text-sm text-brand-light-gray">
                    {member.role}
                  </span>
                </div>
              </div>

              <h3 className="font-oswald font-light text-lg sm:text-xl text-brand-text mb-3">
                {member.title}
              </h3>

              <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed">
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
