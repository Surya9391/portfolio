import React from 'react';
import { motion } from 'framer-motion';

const SkillShowcase = () => {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 90, color: '#61DAFB' },
        { name: 'TypeScript', level: 85, color: '#3178C6' },
        { name: 'Tailwind CSS', level: 88, color: '#06B6D4' },
        { name: 'Next.js', level: 82, color: '#000000' }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Express', level: 80, color: '#000000' },
        { name: 'MongoDB', level: 75, color: '#47A248' },
        { name: 'PostgreSQL', level: 70, color: '#336791' }
      ]
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Git', level: 88, color: '#F05032' },
        { name: 'Docker', level: 75, color: '#2496ED' },
        { name: 'AWS', level: 70, color: '#FF9900' },
        { name: 'CI/CD', level: 72, color: '#4CAF50' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-[#415a77] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technical Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-[#64ffda]">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillShowcase; 