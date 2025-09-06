import React from 'react';
import { motion } from 'framer-motion';

interface SkillGroup {
  category: string;
  items: string[];
  icon: string;
  color: string;
  gradient: string;
}

const Skills: React.FC = () => {
  const skills: SkillGroup[] = [
    {
      category: 'Frontend Development',
      items: [
        'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
        'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Redux',
        'Framer Motion', 'Material-UI', 'Responsive Design'
      ],
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-400 via-cyan-400 to-blue-600'
    },
    {
      category: 'Backend Development',
      items: [
        'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL',
        'RESTful APIs', 'GraphQL', 'Firebase', 'AWS',
        'Authentication', 'Authorization'
      ],
      icon: '⚙️',
      color: 'from-green-500 to-emerald-500',
      gradient: 'from-green-400 via-emerald-400 to-green-600'
    },
    {
      category: 'Tools & Practices',
      items: [
        'Git', 'GitHub', 'VS Code', 'Docker',
        'Jest', 'CI/CD', 'Agile/Scrum', 'npm/yarn',
        'Webpack', 'Performance Optimization'
      ],
      icon: '🛠️',
      color: 'from-purple-500 to-pink-500',
      gradient: 'from-purple-400 via-pink-400 to-purple-600'
    },
    {
      category: 'Soft Skills',
      items: [
        'Problem Solving', 'Team Collaboration', 'Communication',
        'Time Management', 'Adaptability', 'Leadership',
        'Critical Thinking'
      ],
      icon: '🤝',
      color: 'from-yellow-500 to-orange-500',
      gradient: 'from-yellow-400 via-orange-400 to-yellow-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Skills & Expertise
          </motion.h2>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and professional capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
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
                  className="text-6xl mb-6"
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
                        color: "#64ffda"
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
  );
};

export default Skills;
