import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', threshold = 0.12 }) {
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

  const classes = ['scroll-reveal', isVisible ? 'is-visible' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  );
}
