import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Linkedin, CheckCircle } from 'lucide-react';
import { footerConfig } from '@/config';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  // Null check: if config is empty, return null
  if (!footerConfig.copyright && !footerConfig.newsletterTitle) {
    return null;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subject = encodeURIComponent('Message from Portfolio Website');
    const body = encodeURIComponent(`Hi Simon,\n\n${message}\n\nFrom: ${email}`);
    
    // Open email client with pre-filled content
    window.open(`mailto:ssyting1@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    // Show success message
    setSubmitStatus('success');
    setEmail('');
    setMessage('');
    
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get LinkedIn URL from config
  const linkedInUrl = footerConfig.socialLinks?.instagram || 'https://www.linkedin.com/in/simon-ting-19262a64/';

  return (
    <footer
      ref={footerRef}
      id="contact"
      className={`relative py-14 sm:py-16 lg:py-20 transition-colors duration-500 ${
        isEmailFocused ? 'bg-brand-text' : 'bg-brand-linen'
      }`}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -bottom-10 sm:-bottom-20 -right-4 sm:-right-10 font-oswald font-extralight text-[25vw] sm:text-[20vw] leading-none select-none transition-colors duration-500 ${
            isEmailFocused ? 'text-brand-dark-gray/10' : 'text-brand-border'
          }`}
        >
          {footerConfig.brandWatermark}
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact Form */}
          <div className="lg:col-span-1">
            <h3
              className={`font-oswald font-light text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-linen' : 'text-brand-text'
              }`}
            >
              {footerConfig.newsletterTitle}
            </h3>
            <p
              className={`font-roboto text-sm mb-6 sm:mb-8 transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
              }`}
            >
              {footerConfig.newsletterDescription}
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4 sm:space-y-5">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder="Your email address"
                required
                className={`w-full px-0 py-3 bg-transparent border-b text-sm focus:outline-none transition-colors duration-500 ${
                  isEmailFocused
                    ? 'border-brand-light-gray text-brand-linen placeholder:text-brand-dark-gray'
                    : 'border-brand-border text-brand-text placeholder:text-brand-light-gray focus:border-brand-text'
                }`}
              />
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder="Your message"
                rows={3}
                className={`w-full px-0 py-3 bg-transparent border-b text-sm focus:outline-none resize-none transition-colors duration-500 ${
                  isEmailFocused
                    ? 'border-brand-light-gray text-brand-linen placeholder:text-brand-dark-gray'
                    : 'border-brand-border text-brand-text placeholder:text-brand-light-gray focus:border-brand-text'
                }`}
              />
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 font-roboto text-sm uppercase tracking-wider transition-colors duration-300 ${
                  isEmailFocused
                    ? 'bg-brand-linen text-brand-text hover:bg-brand-border'
                    : 'bg-brand-text text-brand-linen hover:bg-brand-dark-gray'
                }`}
              >
                {footerConfig.subscribeText}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-start gap-2 text-green-600">
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span className="font-roboto text-sm">Your email client has opened with a pre-filled message. Just click send and I'll receive it!</span>
                </div>
              )}
            </form>
          </div>

          {/* Right: Connect & Back to Top */}
          <div className="lg:col-span-1 flex flex-col justify-between lg:items-end">
            <div className="lg:text-right">
              <h4
                className={`font-oswald text-xs uppercase tracking-widest mb-3 sm:mb-4 transition-colors duration-500 ${
                  isEmailFocused ? 'text-brand-light-gray' : 'text-brand-dark-gray'
                }`}
              >
                {footerConfig.socialLabel}
              </h4>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-roboto text-sm transition-colors duration-300 ${
                  isEmailFocused
                    ? 'text-brand-linen hover:text-brand-light-gray'
                    : 'text-brand-text hover:text-brand-dark-gray'
                }`}
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className={`mt-8 lg:mt-0 inline-flex items-center gap-2 font-roboto text-xs uppercase tracking-wider transition-colors duration-300 group ${
                isEmailFocused
                  ? 'text-brand-linen hover:text-brand-light-gray'
                  : 'text-brand-text hover:text-brand-dark-gray'
              }`}
            >
              {footerConfig.backToTopText}
              <ArrowUp size={14} className="transform transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 sm:mt-16 pt-6 sm:pt-8 border-t transition-colors duration-500 ${
            isEmailFocused ? 'border-brand-dark-gray' : 'border-brand-border'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p
              className={`font-roboto text-xs text-center sm:text-left transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-dark-gray' : 'text-brand-light-gray'
              }`}
            >
              {footerConfig.copyright}
            </p>
            <p
              className={`font-roboto text-xs text-center sm:text-right transition-colors duration-500 ${
                isEmailFocused ? 'text-brand-dark-gray' : 'text-brand-light-gray'
              }`}
            >
              {footerConfig.credit}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
