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
    <section ref={sectionRef} id="day-in-life" className="relative py-14 sm:py-16 lg:py-20 bg-brand-linen">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="font-oswald font-light text-3xl sm:text-4xl lg:text-5xl text-brand-text mb-3">
            {dayInLifeConfig.sectionTitle}
          </h2>
          <p className="font-roboto text-base sm:text-lg text-brand-dark-gray max-w-2xl mx-auto">
            {dayInLifeConfig.sectionDescription}
          </p>
        </div>

        {/* Activities */}
        <div ref={timelineRef} className="space-y-10 sm:space-y-12 lg:space-y-14">
          {dayInLifeConfig.activities.map((activity, index) => {
            const Icon = iconMap[activity.icon] || Coffee;
            const isEven = index % 2 === 0;

            return (
              <div
                key={activity.id}
                className={`timeline-item flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:items-center lg:gap-10`}
              >
                {/* Image - smaller and aligned */}
                <div className="lg:w-[45%] flex-shrink-0">
                  <div className="relative overflow-hidden rounded-lg shadow-md group">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 sm:h-52 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:w-[55%] mt-5 lg:mt-0 ${isEven ? 'lg:pl-2' : 'lg:pr-2'}`}>
                  {/* Time badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 bg-brand-text text-brand-linen rounded-full mb-3`}
                  >
                    <Icon size={14} />
                    <span className="font-roboto text-xs font-medium">{activity.time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-oswald font-medium text-xl sm:text-2xl text-brand-text mb-2">
                    {activity.title}
                  </h3>

                  {/* Description */}
                  <p className="font-roboto text-sm sm:text-base text-brand-dark-gray leading-relaxed mb-3">
                    {activity.description}
                  </p>

                  {/* Tasks list - closer to description */}
                  <ul className="space-y-1.5">
                    {activity.tasks.map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className="flex items-start gap-2 text-sm text-brand-dark-gray"
                      >
                        <span className="w-1 h-1 bg-brand-text rounded-full mt-2 flex-shrink-0" />
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
        <div className="mt-12 sm:mt-14 lg:mt-16 text-center">
          <p className="font-roboto text-base sm:text-lg text-brand-dark-gray max-w-3xl mx-auto leading-relaxed">
            {dayInLifeConfig.closingStatement}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DayInLife;
