import React from 'react';
import { FiArrowUp, FiMail, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const FloatingActionButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <button
        onClick={scrollToTop}
        className="bg-[#64ffda] text-white p-4 rounded-full shadow-lg hover:bg-[#4fd1c5] transition-all duration-200 flex items-center justify-center"
        title="Scroll to Top"
      >
        {React.createElement(FiArrowUp as React.ElementType, { size: 22 })}
      </button>
      <button
        onClick={goToContact}
        className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-400 transition-all duration-200 flex items-center justify-center"
        title="Contact"
      >
        {React.createElement(FiMail as React.ElementType, { size: 22 })}
      </button>
      <button
        onClick={toggleTheme}
        className="bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-200 flex items-center justify-center"
        title="Toggle Theme"
      >
        {isDarkMode
          ? React.createElement(FiSun as React.ElementType, { size: 22 })
          : React.createElement(FiMoon as React.ElementType, { size: 22 })}
      </button>
    </div>
  );
};

export default FloatingActionButton; 