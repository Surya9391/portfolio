import React from 'react';
import { motion } from 'framer-motion';

const ResumeDownload = () => {
  const handleDownload = () => {
    // Replace with your actual resume file path
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Surya_Sangadi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={handleDownload}
        className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-5 h-5 text-[#64ffda]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={{ y: 0 }}
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </motion.svg>
        <span className="text-sm font-medium">Download Resume</span>
      </motion.button>
    </motion.div>
  );
};

export default ResumeDownload; 