import React from 'react';
import { motion, Variants, Transition } from 'framer-motion';

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
    const transition: Transition = {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    };

    const baseVariants: Variants = {
      hidden: { 
        opacity: 0,
        transition
      },
      visible: {
        opacity: 1,
        transition: {
          ...transition,
          delay
        }
      }
    };

    const directionVariants: Record<string, Variants> = {
      up: {
        hidden: { 
          opacity: 0,
          y: 20,
          transition
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: {
            ...transition,
            delay
          }
        }
      },
      down: {
        hidden: { 
          opacity: 0,
          y: -20,
          transition
        },
        visible: { 
          opacity: 1,
          y: 0,
          transition: {
            ...transition,
            delay
          }
        }
      },
      left: {
        hidden: { 
          opacity: 0,
          x: 20,
          transition
        },
        visible: { 
          opacity: 1,
          x: 0,
          transition: {
            ...transition,
            delay
          }
        }
      },
      right: {
        hidden: { 
          opacity: 0,
          x: -20,
          transition
        },
        visible: { 
          opacity: 1,
          x: 0,
          transition: {
            ...transition,
            delay
          }
        }
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