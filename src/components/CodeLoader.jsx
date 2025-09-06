import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const floatingIcons = [
  { icon: '⚛️', delay: 0, duration: 3, size: 'text-3xl' },
  { icon: '🚀', delay: 0.5, duration: 4, size: 'text-2xl' },
  { icon: '💻', delay: 1, duration: 3.5, size: 'text-4xl' },
  { icon: '🎯', delay: 1.5, duration: 4.5, size: 'text-3xl' },
  { icon: '⚡', delay: 2, duration: 3, size: 'text-2xl' },
  { icon: '🔥', delay: 2.5, duration: 4, size: 'text-3xl' },
  { icon: '💎', delay: 3, duration: 3.5, size: 'text-2xl' },
  { icon: '🌟', delay: 3.5, duration: 4.5, size: 'text-3xl' },
];

const CodeLoader = () => {
  const [text, setText] = useState('');
  const phrases = [
    'Initializing... 🚀',
    'Loading Components... ⚛️',
    'Preparing Experience... 💻',
    'Almost Ready... 🌟'
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const currentText = phrases[currentPhrase];
    const interval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentPhrase]);

  return (
    <div className="loading-container">
      {/* Floating Icons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingIcons.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} opacity-20`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="code-loader glass border-2 border-[#64ffda] shadow-2xl relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, boxShadow: [
          '0 0 20px #64ffda44',
          '0 0 40px #64ffda66',
          '0 0 60px #64ffda44',
          '0 0 20px #64ffda44',
        ] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="typing-text gradient-text drop-shadow-lg">{text}</span>
        <span></span>
        {/* Progress Bar */}
        <motion.div
          className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-b-lg"
          initial={{ width: 0 }}
          animate={{ width: [0, '100%', 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-[#64ffda] font-semibold z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></div>
          <span className="gradient-text">Building your experience...</span>
        </div>
      </div>
    </div>
  );
};

export default CodeLoader; 