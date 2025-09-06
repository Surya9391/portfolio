import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../interactive/TiltCard';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  stats: {
    commits: string;
    stars: string;
    forks: string;
  };
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "My personal portfolio built with React, TypeScript, and Framer Motion featuring interactive animations and modern design.",
      image: "/images/portfolio.jpg",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/yourusername/portfolio",
      liveUrl: "https://your-portfolio.com",
      features: ["Responsive Design", "Dynamic Animations", "Dark Mode", "Interactive UI"],
      stats: {
        commits: "100+",
        stars: "20+",
        forks: "5+"
      }
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, payment integration, and real-time inventory management.",
      image: "/images/ecommerce.jpg",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://your-ecommerce.com",
      features: ["User Authentication", "Payment Integration", "Real-time Updates", "Admin Dashboard"],
      stats: {
        commits: "250+",
        stars: "45+",
        forks: "15+"
      }
    },
    // Add more projects as needed
  ];

  return (
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
            Featured Projects
          </motion.h2>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Here are some of my notable projects that showcase my skills and experience
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <TiltCard>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[#64ffda]/20 transition-all duration-300">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 relative group overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <div className="absolute bottom-0 p-6 w-full">
                        <div className="flex justify-around space-x-4 mb-4">
                          {Object.entries(project.stats).map(([key, value]) => (
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
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] rounded-full text-sm font-medium border border-[#64ffda]/30"
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)"
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    <ul className="mb-6 space-y-3">
                      {project.features.map((feature) => (
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
                    
                    <div className="flex space-x-4">
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
      </div>
    </section>
  );
};

export default Projects;
