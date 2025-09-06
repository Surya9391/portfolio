import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { lazy } from 'react';

const TiltCard = lazy(() => import('../components/interactive/TiltCard'));

const Projects: React.FC = React.memo(() => {
  const projects = [
    {
      id: 1,
      title: 'Alpha Trading Platform',
      description: 'Alpha Trading is a Java-based application for analyzing and tracking cryptocurrency trading trends.',
      image: '/images/project1.png',
      technologies: ['Java', 'coingecko API','gemini API', 'MySQL'],
      githubUrl: 'https://github.com/Surya9391/Alpha_Trading_Platform.git',
      liveUrl: '#',
      category: 'Java Full Stack',
    },
    {
      id: 2,
      title: 'Resortify',
      description: 'Resortify is a smart waste management app that promotes recycling and sustainability through IoT-based monitoring and eco-friendly practices.',
      image: '/images/project2.png',
      technologies: ['React Native','TypeScript', 'Express', 'MongoDB' ,'IoT' ,'esp32' , 'arduino','Supabase'],
      githubUrl: 'https://github.com/Surya9391/Resortify.git',
      category: 'web',
    },
     {
      id: 3,
      title: 'BookMyShow Clone',
      description: 'BookMyShow Clone is a web application for booking movie tickets online.',
      image: '/images/project3.png',
      technologies: ['TypeScript', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/Surya9391/NelaTicket-Fullstack-main.git',
      category: 'Web Application',
    },
     {
      id: 4,
      title: 'Smart Money Tracker',
      description: 'Smart Money Tracker is a web-based application that helps users efficiently manage and track their income and expenses',
      image: '/images/project4.png',
      technologies: ['React.js','Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/Surya9391/Smart_Money_Tracker.git',
      category: 'Web Application',
    },
     {
      id: 5,
      title: 'PowerPredict',
      description: 'PowerPredict is a machine learning project that predicts power consumption based on historical data.',
      image: '/images/project5.png',
      technologies: ['Python', 'Pandas & NumPy', 'Matplotlib', 'Seaborn'],
      githubUrl: 'https://github.com/Surya9391/Energy-Consumption-Prediction-RF-ML-main.git',
      category: 'AI/ML',
    },
    
    

    // Add more projects as needed
  ];

  const [selectedTech, setSelectedTech] = useState('All');
  const allTechs = Array.from(new Set(projects.flatMap(p => p.technologies)));
  const filteredProjects = selectedTech === 'All' ? projects : projects.filter(p => p.technologies.includes(selectedTech));

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            This section highlights a collection of my recent work and personal projects, showcasing my skills in Java Full Stack, MERN, React Native, and IoT. Each project reflects my ability to design, develop, and implement practical solutions—ranging from web and mobile applications to IoT-based systems—while focusing on problem-solving, clean code, and user-centric design.
          </p>

          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <button
              className={`px-4 py-2 rounded-full border font-medium transition-colors duration-200 ${selectedTech === 'All' ? 'bg-[#64ffda] text-white' : 'bg-white/10 text-[#64ffda] hover:bg-[#64ffda]/20'}`}
              onClick={() => setSelectedTech('All')}
            >
              All
            </button>
            {allTechs.map(tech => (
              <button
                key={tech}
                className={`px-4 py-2 rounded-full border font-medium transition-colors duration-200 ${selectedTech === tech ? 'bg-[#64ffda] text-white' : 'bg-white/10 text-[#64ffda] hover:bg-[#64ffda]/20'}`}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading...</div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="card group bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <TiltCard>
                    <div className="relative h-48 overflow-hidden rounded-md mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-sm bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4 mt-auto">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center"
                        >
                          GitHub
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4 0V9m0 0l-3-3m3 3L14 7l3 3-3-3z"
                            />
                          </svg>
                        </a>
                        <a
                          href={project.liveUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center"
                        >
                          Live Demo
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4 0V9m0 0l-3-3m3 3L14 7l3 3-3-3z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
});

export default Projects; 