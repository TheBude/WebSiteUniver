import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.08,
  cascade = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const classes = [
    'scroll-reveal',
    `reveal-${animation}`,
    isVisible ? 'is-visible' : '',
    cascade ? 'reveal-cascade' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={elementRef} className={classes} style={style}>
      {children}
    </div>
  );
}
