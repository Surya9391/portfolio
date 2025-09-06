import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface SlideshowProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  autoPlay = true,
  interval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className={`relative w-full h-[500px] overflow-hidden rounded-xl perspective-1000 ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            rotateY: { duration: 0.5 },
            scale: { duration: 0.3 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          style={{ transformStyle: 'preserve-3d' }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrevious();
            }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full transform-style-3d">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover rounded-xl"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 to-transparent rounded-xl"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-3xl font-bold mb-2 text-neon"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {slides[currentIndex].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-lg text-gray-200"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {slides[currentIndex].description}
                </motion.p>
                {slides[currentIndex].link && (
                  <motion.a
                    href={slides[currentIndex].link}
                    initial={{ opacity: 0, y: 20, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="inline-block mt-4 px-6 py-2 bg-electric hover:bg-electric-600 text-white rounded-full transition-colors duration-200"
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-charcoal-900/50 text-white hover:bg-charcoal-800/80 transition-colors duration-200"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, rotateY: -15 }}
        whileTap={{ scale: 0.9 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {React.createElement(FiChevronLeft as React.ComponentType<{ size?: number }>, { size: 24 })}
      </motion.button>
      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-charcoal-900/50 text-white hover:bg-charcoal-800/80 transition-colors duration-200"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, rotateY: 15 }}
        whileTap={{ scale: 0.9 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {React.createElement(FiChevronRight as React.ComponentType<{ size?: number }>, { size: 24 })}
      </motion.button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-neon w-4 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow; 