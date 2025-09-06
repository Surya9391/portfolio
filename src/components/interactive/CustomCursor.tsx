import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, Variants, Transition, TargetAndTransition } from 'framer-motion';

// Debounce function to limit the rate of updates
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const updateMousePosition = debounce((e: PointerEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 5); // 5ms debounce time

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactiveTags = ['A', 'BUTTON'];
      const textInputTags = ['INPUT', 'TEXTAREA'];

      let newVariant = 'default';

      if (textInputTags.some(tag => target.tagName === tag || (target as HTMLElement).closest(tag.toLowerCase()))) {
        newVariant = 'text';
      } else if (interactiveTags.some(tag => target.tagName === tag || (target as HTMLElement).closest(tag.toLowerCase()))) {
        newVariant = 'interactive';
      }
      setCursorVariant(newVariant);
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];
      const isInteractiveTarget = interactiveTags.some(tag => target.tagName === tag || (target as HTMLElement).closest(tag.toLowerCase()));

      if (isInteractiveTarget && !(e.relatedTarget as HTMLElement)?.closest(interactiveTags.map(t => t.toLowerCase()).join(','))) {
        setCursorVariant('default');
      }
    };

    window.addEventListener('pointermove', updateMousePosition);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('pointermove', updateMousePosition);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  type CustomVariant = Record<string, TargetAndTransition>;
  const variants: CustomVariant = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(100, 255, 218, 0.1)', // Subtle electric glow
      borderColor: '#64ffda', // Electric border
      borderWidth: 2,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: 'spring', stiffness: 150, damping: 20, mass: 0.5 },
      borderRadius: '50%',
    },
    interactive: {
      width: 60, // Larger size for interactive elements
      height: 60,
      backgroundColor: 'rgba(65, 90, 119, 0.4)', // Darker, more solid for hover
      borderColor: '#64ffda',
      borderWidth: 2,
      x: mousePosition.x - 30, // Center the larger cursor
      y: mousePosition.y - 30,
      scale: 1.1, // Slight scale effect
      transition: { type: 'spring', stiffness: 200, damping: 25, mass: 0.5 },
      borderRadius: '50%',
    },
    text: {
      width: 4, // Thin vertical line
      height: 28,
      backgroundColor: 'transparent', // transparent to show the I-beam icon
      borderColor: 'transparent',
      borderWidth: 0,
      x: mousePosition.x - 2,
      y: mousePosition.y - 14, // Center the text cursor vertically
      transition: { type: 'spring', stiffness: 200, damping: 25, mass: 0.5 },
      borderRadius: '2px', // Slight roundness for the text cursor
    }
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] flex items-center justify-center" // High z-index to be on top, and flex for inner content
      variants={variants}
      animate={cursorVariant}
    >
      <AnimatePresence mode="wait">
        {cursorVariant === 'interactive' && (
          <motion.div
            key="interactive-icon"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        )}
        {cursorVariant === 'text' && (
          <motion.div
            key="text-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 text-[#64ffda]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4-4m-4 4l-4-4M4 4h.01M4 4h.01M4 4h.01" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor; 