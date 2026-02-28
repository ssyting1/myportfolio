import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sunrise, 
  Mail, 
  Users, 
  FileText, 
  MessageSquare, 
  Search, 
  BarChart3, 
  Briefcase,
  Coffee,
  Moon
} from 'lucide-react';
import { dayInLifeConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Sunrise,
  Mail,
  Users,
  FileText,
  MessageSquare,
  Search,
  BarChart3,
  Briefcase,
  Coffee,
  Moon,
};

const DayInLife = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Null check
  if (!dayInLifeConfig.sectionTitle || dayInLifeConfig.activities.length === 0) {
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
            start: 'top 85%',
          },
        }
      );

      // Timeline items animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        timelineItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
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
    <section ref={sectionRef} id="day-in-life" className="relative py-16 sm:py-20 lg:py-24 bg-brand-linen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 className="font-oswald font-light text-4xl sm:text-5xl lg:text-6xl text-brand-text mb-4">
            {dayInLifeConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-base sm:text-lg lg:text-xl text-brand-dark-gray max-w-3xl mx-auto leading-relaxed">
            {dayInLifeConfig.sectionDescription}
          </p>
        </div>

        {/* Activities */}
        <div ref={timelineRef} className="space-y-12 sm:space-y-14 lg:space-y-16">
          {dayInLifeConfig.activities.map((activity, index) => {
            const Icon = iconMap[activity.icon] || Coffee;
            const isEven = index % 2 === 0;

            return (
              <div
                key={activity.id}
                className={`timeline-item flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:items-center lg:gap-12`}
              >
                {/* Image - smaller and aligned */}
                <div className="lg:w-[45%] flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg shadow-md group">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-52 sm:h-56 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:w-[55%] mt-6 lg:mt-0 ${isEven ? 'lg:pl-2' : 'lg:pr-2'}`}>
                  {/* Time badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-brand-text text-brand-linen rounded-full mb-4`}
                  >
                    <Icon size={16} />
                    <span className="font-roboto text-sm font-medium">{activity.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-oswald font-medium text-2xl sm:text-3xl text-brand-text mb-3">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="font-roboto text-base sm:text-lg text-brand-dark-gray leading-relaxed mb-4">
                    {activity.description}
                  </p>

                  {/* Tasks list - closer to description */}
                  <ul className="space-y-2">
                    {activity.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-start gap-3 text-base text-brand-dark-gray"
                      >
                        <span className="w-1.5 h-1.5 bg-brand-text rounded-full mt-2 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mt-14 sm:mt-16 lg:mt-20 text-center">
          <p className="font-roboto text-base sm:text-lg lg:text-xl text-brand-dark-gray max-w-3xl mx-auto leading-relaxed">
            {dayInLifeConfig.closingStatement}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DayInLife;
