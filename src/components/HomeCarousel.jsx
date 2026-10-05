import { useEffect, useState } from 'react';
import { homeCarouselSlides } from '../homeCarouselSlides';
import './HomeCarousel.css';

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % homeCarouselSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
  };

  const slide = homeCarouselSlides[activeIndex];

  return (
    <section
      className="home-carousel"
      aria-label="Universitet haqida ma’lumotlar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      <article className="home-carousel__slide home-carousel__slide--next" key={activeIndex}>
        <img className="home-carousel__image" src={slide.image} alt={slide.imageAlt} />
        <div className="home-carousel__shade" />
        <div className="home-carousel__content">
          <p className="home-carousel__category">{slide.category}</p>
          <h2>{slide.title}</h2>
        </div>
      </article>

      <div className="home-carousel__footer">
        <div className="home-carousel__controls" aria-hidden="true">
          {homeCarouselSlides.map((item, index) => (
            <span
              className={`home-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
              key={item.title}
            />
          ))}
        </div>
        <button
          className="home-carousel__pause"
          type="button"
          aria-label={isPaused ? 'Avtomatik aylanishni davom ettirish' : 'Avtomatik aylanishni to‘xtatish'}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? 'Davom ettirish' : 'Pauza'}
        </button>
      </div>
    </section>
  );
}