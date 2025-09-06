import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}) => {
  const getDirectionVariants = (): Variants => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.6, -0.05, 0.01, 0.99],
          delay
        }
      }
    };

    const directionVariants = {
      up: {
        hidden: { ...baseVariants.hidden, y: 20 },
        visible: { ...baseVariants.visible, y: 0 }
      },
      down: {
        hidden: { ...baseVariants.hidden, y: -20 },
        visible: { ...baseVariants.visible, y: 0 }
      },
      left: {
        hidden: { ...baseVariants.hidden, x: 20 },
        visible: { ...baseVariants.visible, x: 0 }
      },
      right: {
        hidden: { ...baseVariants.hidden, x: -20 },
        visible: { ...baseVariants.visible, x: 0 }
      }
    };

    return directionVariants[direction];
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={getDirectionVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 