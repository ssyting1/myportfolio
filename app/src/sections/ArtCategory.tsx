import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar } from 'lucide-react';
import { artCategoryConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const ArtCategory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredImageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  // Null check: if config is empty, return null
  if (!artCategoryConfig.sectionTitle && artCategoryConfig.gridArticles.length === 0) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Featured image reveal
      gsap.fromTo(
        featuredImageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: featuredImageRef.current,
            start: 'top 85%',
          },
        }
      );

      // Skills section stagger
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 88%',
            },
          }
        );
      }

      // Expertise tags stagger
      const expertiseItems = expertiseRef.current?.querySelectorAll('.expertise-tag');
      if (expertiseItems) {
        gsap.fromTo(
          expertiseItems,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: expertiseRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section title */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="font-oswald font-light text-4xl sm:text-5xl lg:text-6xl text-brand-text">
            {artCategoryConfig.sectionTitle}
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Left Column: Photo + Description */}
          <div className="space-y-5 sm:space-y-6">
            {/* Featured Image */}
            <div
              ref={featuredImageRef}
              className="relative aspect-[4/3] overflow-hidden rounded-sm"
            >
              <img
                src={artCategoryConfig.featuredImage}
                alt={artCategoryConfig.featuredImageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6">
                <span className="font-roboto text-sm uppercase tracking-wider text-white/70 mb-2 block">
                  {artCategoryConfig.featuredLabel}
                </span>
                <h2 className="font-oswald font-light text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
                  {artCategoryConfig.featuredTitle}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="font-roboto text-base sm:text-lg lg:text-xl text-brand-dark-gray leading-relaxed">
              {artCategoryConfig.featuredDescription}
            </p>
          </div>

          {/* Right Column: Core Skills + Domain Expertise + Certification */}
          <div className="space-y-6 sm:space-y-8">
            {/* Core Skills */}
            <div ref={skillsRef}>
              <h3 className="font-oswald text-sm uppercase tracking-widest text-brand-dark-gray mb-4 sm:mb-5">
                Core Skills
              </h3>
              <div className="space-y-3">
                {artCategoryConfig.gridArticles.map((article) => (
                  <div key={article.id} className="skill-item flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <span className="font-roboto text-sm uppercase tracking-wider text-brand-light-gray">
                        {article.category}
                      </span>
                      <h4 className="font-oswald font-medium text-base sm:text-lg text-brand-text">
                        {article.title}
                      </h4>
                    </div>
                    <span className="font-roboto text-base text-brand-dark-gray">
                      {article.readTime}{artCategoryConfig.readSuffix}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Expertise */}
            <div ref={expertiseRef}>
              <h3 className="font-oswald text-sm uppercase tracking-widest text-brand-dark-gray mb-4 sm:mb-5">
                {artCategoryConfig.categoriesLabel}
              </h3>
              <div className="flex flex-wrap gap-3">
                {artCategoryConfig.categories.map((cat) => (
                  <span
                    key={cat}
                    className="expertise-tag px-4 py-2 bg-brand-text text-white font-roboto text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-oswald text-sm uppercase tracking-widest text-brand-dark-gray mb-4 sm:mb-5 flex items-center gap-2">
                <Calendar size={18} />
                {artCategoryConfig.eventsLabel}
              </h3>
              <div className="flex flex-col gap-3">
                {artCategoryConfig.events.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 sm:gap-4">
                    <span className="font-roboto text-base text-brand-light-gray">
                      {event.date}
                    </span>
                    <span className="font-roboto text-base text-brand-text">
                      {event.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtCategory;
