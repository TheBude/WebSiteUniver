import React, { useEffect, useState } from 'react';
import { homeCarouselSlides } from '../homeCarouselSlides';
import './HomeCarousel.css';

export default function HomeCarousel({ language = 'uz' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  const handleNext = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % homeCarouselSlides.length);
  };

  const handlePrev = () => {
    setDirection('previous');
    setActiveIndex((prev) => (prev - 1 + homeCarouselSlides.length) % homeCarouselSlides.length);
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % homeCarouselSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex]);

  const slide = homeCarouselSlides[activeIndex];

  // Matnlarni tanlangan til bo'yicha olish (agar obyekt bo'lsa)
  const categoryText = typeof slide.category === 'object' ? slide.category[language] || slide.category.uz : slide.category;
  const titleText = typeof slide.title === 'object' ? slide.title[language] || slide.title.uz : slide.title;
  const altText = typeof slide.imageAlt === 'object' ? slide.imageAlt[language] || slide.imageAlt.uz : slide.imageAlt;

  return (
    <section className="home-carousel" aria-label="Universitet haqida ma’lumotlar">
      {/* Slayd rasmi, qorong'ulatish foni va matnlar */}
      <article
        className={`home-carousel__slide home-carousel__slide--${direction}`}
        key={`${activeIndex}-${language}`}
      >
        <img className="home-carousel__image" src={slide.image} alt={altText} />
        <div className="home-carousel__shade" />
        <div className="home-carousel__content">
          {categoryText && <p className="home-carousel__category">{categoryText}</p>}
          <h2>{titleText}</h2>
        </div>
      </article>

      {/* Chap tomonga o'tkazuvchi shaffof zona va strelka */}
      <div className="home-carousel__nav-zone home-carousel__nav-zone--left" onClick={handlePrev}>
        <button
          type="button"
          className="home-carousel__arrow-btn"
          aria-label="Oldingi slayd"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        >
          &#10094;
        </button>
      </div>

      {/* O'ng tomonga o'tkazuvchi shaffof zona va strelka */}
      <div className="home-carousel__nav-zone home-carousel__nav-zone--right" onClick={handleNext}>
        <button
          type="button"
          className="home-carousel__arrow-btn"
          aria-label="Keyingi slayd"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          &#10095;
        </button>
      </div>

      {/* Pastdagi indikator nuqtalar (Dots) */}
      <div className="home-carousel__footer">
        <div className="home-carousel__controls" aria-hidden="true">
          {homeCarouselSlides.map((item, index) => (
            <span
              key={index}
              className={`home-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => {
                setDirection(index > activeIndex ? 'next' : 'previous');
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}