import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Software Engineer Intern',
    company: 'SkillDrize',
    period: '2023',
    description: 'Developed Bitcoin-related applications and worked on trading platform features.',
    skills: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Microservices'],
    achievements: [
      'Developed core trading platform features',
      'Integrated cryptocurrency market data APIs',
      'Implemented real-time price tracking'
    ]
  }
];

const ExperienceTimeline: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
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
            Professional Journey
          </motion.h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            A timeline of my professional growth and experiences
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#64ffda] via-purple-400 to-[#64ffda]" />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              } mb-16`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#64ffda]/30 transition-all duration-300 hover:shadow-[#64ffda]/10 hover:shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {experience.title}
                  </h3>
                  <h4 className="text-xl text-[#64ffda] mb-2">
                    {experience.company}
                  </h4>
                  <p className="text-gray-400 mb-4">
                    {experience.period}
                  </p>
                  <p className="text-gray-300 mb-4">
                    {experience.description}
                  </p>
                  <div className="mb-4">
                    <h5 className="text-white font-semibold mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside text-gray-300">
                      {experience.achievements.map((achievement, i) => (
                        <li key={i} className="mb-1">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-[#64ffda]/10 text-[#64ffda] rounded-full border border-[#64ffda]/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64ffda] rounded-full border-4 border-slate-900" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
