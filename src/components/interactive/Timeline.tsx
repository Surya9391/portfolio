import React from 'react';
import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements?: string[];
}

interface TimelineProps {
  experiences: Experience[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => (
  <section className="py-16">
    <motion.h2
      className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-purple-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Experience Timeline
    </motion.h2>
    <div className="relative border-l-4 border-[#64ffda] ml-4">
      {experiences.map((exp, i) => (
        <motion.div
          key={exp.title}
          className="mb-12 ml-8 relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="absolute -left-8 top-2 w-6 h-6 bg-[#64ffda] rounded-full border-4 border-white dark:border-slate-900" />
          <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
          <span className="text-sm text-[#64ffda] font-semibold">{exp.company}</span>
          <div className="text-xs text-gray-400 mb-2">{exp.period} | {exp.location}</div>
          <ul className="list-disc list-inside text-gray-300 mb-2">
            {exp.description.map((d, j) => <li key={j}>{d}</li>)}
          </ul>
          <div className="flex flex-wrap gap-2 mb-2">
            {exp.technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs bg-[#64ffda]/10 text-[#64ffda] rounded-full">{tech}</span>
            ))}
          </div>
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="text-xs text-purple-300">Achievements: {exp.achievements.join(', ')}</div>
          )}
        </motion.div>
      ))}
    </div>
  </section>
);

export default Timeline; 