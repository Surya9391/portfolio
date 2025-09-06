import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'Technologies',
    value: '10+',
    icon: '💻',
    description: 'Modern Tech Stack'
  },
  {
    title: 'Projects',
    value: '5+',
    icon: '🚀',
    description: 'Full Stack Projects'
  },
  {
    title: 'Mobile Apps',
    value: '2+',
    icon: '�',
    description: 'React Native Apps'
  },
  {
    title: 'IoT Projects',
    value: '1+',
    icon: '🔌',
    description: 'Smart Systems'
  }
];

const Achievements: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
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
            Professional Milestones
          </motion.h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Key achievements and milestones throughout my professional journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#64ffda]/30 transition-all duration-300 hover:shadow-[#64ffda]/10 hover:shadow-2xl">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  {achievement.icon}
                </motion.div>
                <h3 className="text-4xl font-bold text-[#64ffda] mb-2">
                  {achievement.value}
                </h3>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
