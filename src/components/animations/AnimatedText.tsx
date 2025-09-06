import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '',
  once = true 
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-1.5 inline-block"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Typewriter/Typing Animation for a single string (e.g., name)
interface AnimatedTypingTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
}

export const AnimatedTypingText: React.FC<AnimatedTypingTextProps> = ({ text, className = '', speed = 80 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    let cancelled = false;
    function typeNext() {
      if (cancelled) return;
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
        setTimeout(typeNext, speed);
      }
    }
    typeNext();
    return () => { cancelled = true; };
  }, [text, speed]);
  return (
    <span className={className}>
      {displayed}
      <span className="border-r-2 border-[#64ffda] animate-blink-caret ml-1" />
    </span>
  );
};

export default AnimatedText; 