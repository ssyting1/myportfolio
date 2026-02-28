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
    <section ref={sectionRef} id="about" className="relative py-14 sm:py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section title */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl text-brand-text">
            {artCategoryConfig.sectionTitle}
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column: Photo + Description */}
          <div className="space-y-4 sm:space-y-5">
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
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5">
                <span className="font-roboto text-xs uppercase tracking-wider text-white/70 mb-1 block">
                  {artCategoryConfig.featuredLabel}
                </span>
                <h2 className="font-oswald font-light text-lg sm:text-xl text-white leading-tight">
                  {artCategoryConfig.featuredTitle}
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed">
              {artCategoryConfig.featuredDescription}
            </p>
          </div>

          {/* Right Column: Core Skills + Domain Expertise + Certification */}
          <div className="space-y-5 sm:space-y-6">
            {/* Core Skills */}
            <div ref={skillsRef}>
              <h3 className="font-oswald text-xs uppercase tracking-widest text-brand-dark-gray mb-3 sm:mb-4">
                Core Skills
              </h3>
              <div className="space-y-2">
                {artCategoryConfig.gridArticles.map((article) => (
                  <div key={article.id} className="skill-item flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <span className="font-roboto text-xs uppercase tracking-wider text-brand-light-gray">
                        {article.category}
                      </span>
                      <h4 className="font-oswald font-medium text-sm sm:text-base text-brand-text">
                        {article.title}
                      </h4>
                    </div>
                    <span className="font-roboto text-sm text-brand-dark-gray">
                      {article.readTime}{artCategoryConfig.readSuffix}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Expertise */}
            <div ref={expertiseRef}>
              <h3 className="font-oswald text-xs uppercase tracking-widest text-brand-dark-gray mb-3 sm:mb-4">
                {artCategoryConfig.categoriesLabel}
              </h3>
              <div className="flex flex-wrap gap-2">
                {artCategoryConfig.categories.map((cat) => (
                  <span
                    key={cat}
                    className="expertise-tag px-3 py-1.5 bg-brand-text text-white font-roboto text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="font-oswald text-xs uppercase tracking-widest text-brand-dark-gray mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar size={14} />
                {artCategoryConfig.eventsLabel}
              </h3>
              <div className="flex flex-col gap-2">
                {artCategoryConfig.events.map((event, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <span className="font-roboto text-sm text-brand-light-gray">
                      {event.date}
                    </span>
                    <span className="font-roboto text-sm text-brand-text">
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
