import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiHome, FiUser, FiCode, FiMail, FiGithub, FiLinkedin, FiTwitter, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  path: string;
  Icon: IconType;
  label: string;
}

interface SocialLink {
  Icon: IconType;
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: '/', Icon: FiHome, label: 'Home' },
    { path: '/about', Icon: FiUser, label: 'About' },
    { path: '/projects', Icon: FiCode, label: 'Projects' },
    { path: '/contact', Icon: FiMail, label: 'Contact' },
  ];

  const socialLinks: SocialLink[] = [
    { Icon: FiGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
    { Icon: FiLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { Icon: FiTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  const navbarVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      backgroundColor: 'rgba(18, 18, 18, 0)'
    },
    visible: { 
      y: 0, 
      opacity: 1,
      backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.8)' : 'rgba(18, 18, 18, 0)',
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        backgroundColor: { duration: 0.3 }
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="fixed w-full z-50 backdrop-blur-lg transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent hover:animate-glow">
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, Icon, label }) => {
              const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }>;
              return (
                <motion.div
                  key={path}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    to={path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === path
                        ? 'text-neon'
                        : 'text-gray-300 hover:text-neon'
                    }`}
                  >
                    <IconComponent size={20} className="transition-transform duration-200 group-hover:rotate-12" />
                    <span>{label}</span>
                    {location.pathname === path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ Icon, href, label }, index) => {
                const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-300 hover:text-neon transition-colors duration-200"
                    aria-label={label}
                  >
                    <IconComponent size={20} className="transition-transform duration-200" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-neon focus:outline-none transition-colors duration-200"
          >
            {isOpen ? 
              React.createElement(FiX as React.ComponentType<{ size?: number }>, { size: 24 }) : 
              React.createElement(FiMenu as React.ComponentType<{ size?: number }>, { size: 24 })
            }
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-y-0 right-0 w-64 bg-charcoal-900/95 backdrop-blur-lg shadow-xl"
          >
            <div className="pt-20 pb-6 px-4 space-y-6">
              {navItems.map(({ path, Icon, label }, i) => {
                const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }>;
                return (
                  <motion.div
                    key={path}
                    custom={i}
                    variants={itemVariants}
                    whileHover={{ x: 10, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === path
                          ? 'text-neon'
                          : 'text-gray-300 hover:text-neon'
                      }`}
                    >
                      <IconComponent size={20} className="transition-transform duration-200" />
                      <span>{label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex justify-center space-x-6">
                  {socialLinks.map(({ Icon, href, label }, i) => {
                    const IconComponent = Icon as React.ComponentType<{ size?: number; className?: string }>;
                    return (
                      <motion.a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        custom={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.2, rotate: 5, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-300 hover:text-neon transition-colors duration-200"
                        aria-label={label}
                      >
                        <IconComponent size={20} className="transition-transform duration-200" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 