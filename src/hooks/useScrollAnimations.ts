import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Real-time scroll progress tracking
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setScrollProgress(currentProgress);
        setShowBackToTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (prefersReducedMotion) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const ctx = gsap.context(() => {
      // 1. Fast & Smooth GPU-Accelerated Section Reveals (No heavy filter: blur delay)
      const targets = gsap.utils.toArray<HTMLElement>('.animate-on-scroll');
      targets.forEach((target) => {
        gsap.fromTo(
          target,
          {
            opacity: 0.15,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 94%', // Triggers immediately as element enters bottom edge
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. Project Cards: Clean, solid, unoccluded presentation
      // (No opacity fading or premature scaling that covers previous cards)

      // 3. Parallax Floating Watermarks
      const parallaxItems = gsap.utils.toArray<HTMLElement>('[data-parallax-speed]');
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.dataset.parallaxSpeed || '0.2');
        gsap.to(item, {
          y: () => window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3,
          },
        });
      });
    });

    // Refresh ScrollTrigger after initial mount and font render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return { scrollProgress, showBackToTop };
}