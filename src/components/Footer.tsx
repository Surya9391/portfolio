import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

interface SocialLink {
  Icon: IconType;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks: SocialLink[] = [
    { Icon: FiGithub, href: 'https://github.com/Surya9391', label: 'GitHub' },
    { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/surya-sangadi-9489a51ab/', label: 'LinkedIn' },
    { Icon: FiMail, href: 'mailto:suryasangadi127@gmail.com', label: 'Email' },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-charcoal-900 border-t border-charcoal-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent hover:animate-glow">
              Portfolio
            </Link>
            <p className="text-gray-400 text-sm">
              Building digital experiences with modern technologies and creative solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-neon">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-neon transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-neon">Connect</h3>
            <div className="flex space-x-4">
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
                    className="text-gray-400 hover:text-neon transition-colors duration-200"
                    aria-label={label}
                  >
                    <IconComponent size={20} className="transition-transform duration-200" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-charcoal-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-gray-400 text-sm flex items-center space-x-1">
            <span>© {currentYear} Portfolio. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-neon"
            >
              {React.createElement(FiHeart as React.ComponentType<{ size?: number }>, { size: 16 })}
            </motion.span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors duration-200 bg-charcoal-800/50 hover:bg-charcoal-700/50 px-4 py-2 rounded-full"
          >
            <span>Back to top</span>
            {React.createElement(FiArrowUp as React.ComponentType<{ size?: number }>, { size: 16 })}
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 