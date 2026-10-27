import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface SplitHeadlineProps {
  text: string;
  highlightText?: string;
  className?: string;
  highlightClassName?: string;
  delay?: number;
}

export function SplitHeadline({
  text,
  highlightText,
  className = '',
  highlightClassName = '',
  delay = 0.2,
}: SplitHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.split-word');
    if (words.length === 0) return;

    gsap.fromTo(
      words,
      {
        yPercent: 110,
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power4.out',
        stagger: 0.045,
        delay,
      }
    );
  }, [prefersReducedMotion, delay]);

  const renderWords = (phrase: string, isHighlight = false) => {
    return phrase.split(' ').map((word, idx) => (
      <span key={`${isHighlight ? 'hl' : 'std'}-${idx}`} className="split-word-mask mr-[0.28em] last:mr-0 inline-block">
        <span
          className={`split-word inline-block ${
            isHighlight ? highlightClassName : ''
          }`}
        >
          {word}
        </span>
      </span>
    ));
  };

  return (
    <h1 ref={containerRef} className={`tracking-tight leading-[1.12] ${className}`}>
      {renderWords(text, false)}
      {highlightText && (
        <>
          {' '}
          {renderWords(highlightText, true)}
        </>
      )}
    </h1>
  );
}