import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import AnimatedText from '../components/animations/AnimatedText';
import HoverCard from '../components/animations/HoverCard';
import TiltCard from '../components/interactive/TiltCard';
// Lazy loaded components
const SkillShowcase = lazy(() => import('../components/interactive/SkillShowcase'));
const CertificateShowcase = lazy(() => import('../components/interactive/CertificateShowcase'));
const CodeShowcase = lazy(() => import('../components/interactive/CodeShowcase'));
const GitHubActivity = lazy(() => import('../components/interactive/GitHubActivity'));
const Achievements = lazy(() => import('../components/sections/Achievements'));

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scrollBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set visibility after component mounts
    setTimeout(() => setIsVisible(true), 100);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'Alpha Trading Platform',
      description: 'Alpha Trading is a Java-based application for analyzing and tracking cryptocurrency trading trends.',
      image: '/images/project1.png',
      technologies: ['Java', 'coingecko API','gemini API', 'MySQL'],
      githubUrl: 'https://github.com/Surya9391/Alpha_Trading_Platform.git',
      liveUrl: '#',
      category: 'Java Full Stack',
      features: ['Real-time updates', 'Authentication', 'Responsive design'],
      stats: {
        commits: '1.2k+',
        stars: '150+',
        forks: '45+'
      }
    },
    {
       id: 2,
      title: 'Resortify',
      description: 'Resortify is a smart waste management app that promotes recycling and sustainability through IoT-based monitoring and eco-friendly practices.',
      image: '/images/project2.png',
      technologies: ['React Native','TypeScript', 'Express', 'MongoDB' ,'IoT' ,'esp32' , 'arduino','Supabase'],
      githubUrl: 'https://github.com/Surya9391/Resortify.git',
      category: 'web',
      features: ['Type safety', 'API integration', 'IOT sensors'],
      stats: {
        commits: '800+',
        stars: '90+',
        forks: '30+'
      }
    },
    {
      id: 3,
      title: 'PowerPredict',
      description: 'PowerPredict is a machine learning project that predicts power consumption based on historical data.',
      image: '/images/project5.png',
      technologies: ['Python', 'Pandas & NumPy', 'Matplotlib', 'Seaborn'],
      githubUrl: 'https://github.com/Surya9391/Energy-Consumption-Prediction-RF-ML-main.git',
      category: 'AI/ML',
      stats: {
        commits: '800+',
        stars: '90+',
        forks: '30+'
      }
    },
  ];

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-400 via-cyan-400 to-blue-600'
    },
    {
      category: 'Backend',
      items: ['Java','Node.js', 'Express', 'MongoDB', 'MySQL'],
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-400 via-emerald-400 to-green-600'
    },
    {
      category: 'Tools & Others',
      items: ['Git&Github', 'Firebase','IoT','API'],
      icon: '🛠️',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-400 via-pink-400 to-purple-600'
    },
  ];

  const floatingElements = [
    { icon: '⚛️', delay: 0, duration: 3, size: 'text-4xl' },
    { icon: '🚀', delay: 0.5, duration: 4, size: 'text-3xl' },
    { icon: '💻', delay: 1, duration: 3.5, size: 'text-5xl' },
    { icon: '🎯', delay: 1.5, duration: 4.5, size: 'text-4xl' },
    { icon: '⚡', delay: 2, duration: 3, size: 'text-3xl' },
    { icon: '🔥', delay: 2.5, duration: 4, size: 'text-4xl' },
    { icon: '💎', delay: 3, duration: 3.5, size: 'text-3xl' },
    { icon: '🌟', delay: 3.5, duration: 4.5, size: 'text-4xl' },
  ];

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#64ffda] rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} opacity-10`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -150, 0],
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

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900"
          animate={{
            background: [
              "linear-gradient(45deg, #0f172a, #7c3aed, #0f172a)",
              "linear-gradient(45deg, #0f172a, #06b6d4, #0f172a)",
              "linear-gradient(45deg, #0f172a, #ec4899, #0f172a)",
              "linear-gradient(45deg, #0f172a, #7c3aed, #0f172a)",
            ]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          animate={{
            x: isHoveringHero ? mousePosition.x : 0,
            y: isHoveringHero ? mousePosition.y : 0,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />

        {/* Enhanced Animated Circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#64ffda]/30 to-cyan-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection direction="up" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <motion.span 
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#64ffda]/20 via-purple-500/20 to-[#64ffda]/20 text-[#64ffda] text-sm font-medium mt-4 backdrop-blur-sm border border-[#64ffda]/30 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(100, 255, 218, 0.4)"
                }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(100, 255, 218, 0.3)",
                    "0 0 40px rgba(100, 255, 218, 0.5)",
                    "0 0 60px rgba(100, 255, 218, 0.3)",
                    "0 0 20px rgba(100, 255, 218, 0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ Welcome to my Portfolio ✨
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 mb-4"
            >
              <h1 className="relative inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight bg-gradient-to-r from-white via-[#64ffda] to-white bg-clip-text text-transparent">
                Hi, I'm Surya Sangadi
                <span className="block h-1 mt-2 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-full animate-underline" />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-medium tracking-wide">
                Java Full Stack Developer | UI/UX Enthusiast | MERN Stack Developer
              </h2>
              
              {/* Enhanced Live Time Display */}
              <motion.div
                className="text-sm font-medium text-gray-400 mt-4 mb-12 backdrop-blur-lg rounded-full px-4 py-1.5 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                🕐 {currentTime.toLocaleTimeString()} • 📅 {currentTime.toLocaleDateString()}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects"
                  className="group px-10 py-5 bg-gradient-to-r from-[#64ffda] via-[#415a77] to-[#64ffda] text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden text-lg font-bold"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    View My Work
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#415a77] to-[#64ffda] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ x: isHoveringHero ? mousePosition.x * 0.5 : 0 }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20 relative overflow-hidden text-lg font-bold"
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Me
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ x: isHoveringHero ? mousePosition.x * 0.5 : 0 }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.a
                  href="/resume/Surya_Sangadi_Resume.pdf"
                  download
                  className="group px-10 py-5 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#64ffda]/30 relative overflow-hidden flex items-center justify-center text-lg font-bold backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    <svg 
                      className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                      />
                    </svg>
                    Download Resume
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-[#64ffda]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ x: isHoveringHero ? mousePosition.x * 0.5 : 0 }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="text-[#64ffda] text-sm mb-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to explore
              </motion.div>
              <motion.div
                className="w-5 h-9 border border-[#64ffda]/30 rounded-full p-1"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-1.5 bg-[#64ffda] rounded-full mx-auto"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading achievements...</div>}>
        <Achievements />
      </Suspense>

      {/* Skills Section with Enhanced Animation */}
      <section className="py-24 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] bg-clip-text text-transparent mb-6"
                whileInView={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🚀 Skills & Technologies 🚀
              </motion.h2>
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
                My technical expertise and tools I work with to bring ideas to life
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                }}
                className="relative group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#64ffda]/10 to-purple-500/10 rounded-2xl transform transition-all duration-300 group-hover:scale-105 blur-sm"
                  animate={{
                    background: [
                      `linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(168, 85, 247, 0.1))`,
                      `linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(100, 255, 218, 0.1))`,
                      `linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(168, 85, 247, 0.1))`,
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-[#64ffda]/20 transition-all duration-300">
                  <motion.div
                    className="text-6xl mb-6 transform transition-transform group-hover:scale-110"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {skillGroup.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.15,
                          backgroundColor: "rgba(100, 255, 218, 0.2)",
                          color: "#64ffda",
                          boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)"
                        }}
                        className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm text-gray-200 rounded-full shadow-lg border border-white/20 transition-all duration-300 cursor-pointer font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section with Enhanced Animation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] bg-clip-text text-transparent mb-6"
              whileInView={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💼 Featured Projects 💼
            </motion.h2>
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Explore my latest work and personal projects that showcase my skills
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                }}
                className="h-full"
              >
                <TiltCard>
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-[#64ffda]/20 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 relative group overflow-hidden h-56">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 object-center"
                        whileHover={{ scale: 1.1 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-0 p-6 w-full">
                          <div className="flex justify-around space-x-4 mb-4">
                            {project.stats && Object.entries(project.stats).map(([key, value]) => (
                              <motion.div 
                                key={key} 
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                              >
                                <div className="text-[#64ffda] font-bold text-lg">{value}</div>
                                <div className="text-white/70 text-sm capitalize">{key}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] rounded-full text-xs font-medium border border-[#64ffda]/30"
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)"
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      {project.features && (
                        <ul className="mb-4 space-y-2">
                          {project.features.slice(0, 2).map((feature) => (
                            <motion.li 
                              key={feature} 
                              className="flex items-center text-gray-300 text-sm"
                              whileHover={{ x: 5 }}
                            >
                              <svg className="w-4 h-4 mr-3 text-[#64ffda] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                      <div className="flex space-x-4 mt-auto">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center group"
                          whileHover={{ scale: 1.05 }}
                        >
                          <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </motion.a>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center group"
                          whileHover={{ scale: 1.05 }}
                        >
                          <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* View More Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/projects">
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#64ffda]/30 relative overflow-hidden backdrop-blur-sm inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View More Projects</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 bg-[#64ffda]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading...</div>}>
        <GitHubActivity />
      </Suspense>

      {/* Code Showcase Section */}
      <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading...</div>}>
        <CodeShowcase />
      </Suspense>

      {/* Certificate Showcase */}
      <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading...</div>}>
        <CertificateShowcase />
      </Suspense>



      {/* Animated Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] z-50"
        style={{ width: scrollBarWidth }}
      />
    </div>
  );
};

export default Home; 