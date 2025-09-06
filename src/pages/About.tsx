import React, { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { lazy } from 'react';

const Timeline = lazy(() => import('../components/interactive/Timeline'));

const floatingIcons = [
  { icon: '⚛️', delay: 0, duration: 3, size: 'text-3xl' },
  { icon: '🚀', delay: 0.5, duration: 4, size: 'text-2xl' },
  { icon: '💻', delay: 1, duration: 3.5, size: 'text-4xl' },
  { icon: '🎯', delay: 1.5, duration: 4.5, size: 'text-3xl' },
  { icon: '⚡', delay: 2, duration: 3, size: 'text-2xl' },
  { icon: '🔥', delay: 2.5, duration: 4, size: 'text-3xl' },
  { icon: '💎', delay: 3, duration: 3.5, size: 'text-2xl' },
  { icon: '🌟', delay: 3.5, duration: 4.5, size: 'text-3xl' },
];

const About: React.FC = React.memo(() => {
  const experiences = [
    {
      title: 'IOT Robotics & Embedded Systems Intern',
      company: 'Coincent in association with Worisgo',
      period: 'December 2024 - April 2025',
      location: 'Hyderabad, Telangana',
      description: [
        'Developed IoT solutions using Arduino IDE and microcontrollers.',
        'Engineered an IoT model integrating real-time sensor data into a React Native app.',
        'Gained expertise in electronic components and circuit design.',
        'Engineered and enhanced power-efficient circuits to improve the system\'s reliability and performance.'
      ],
      technologies: ['Arduino IDE', 'Microcontrollers', 'React Native', 'IoT', 'Circuit Design'],
      achievements: [
        'Developed innovative IoT solutions',
        'Improved system reliability and performance'
      ]
    },
    {
      title: 'Java Full Stack Intern',
      company: 'SkillDzire',
      period: 'June 2024 - August 2024',
      location: 'Hyderabad, Telangana',
      description: [
        'Built Alpha Trading, a full-stack Java-based trading application.',
        'Worked on backend integration and UI enhancements.',
        'Integrated RESTful APIs & JWT authentication, improving security and API response times by 30%.',
        'Enhanced UI/UX, leading to a 20% improvement in user engagement and retention.'
      ],
      technologies: ['Java', 'Spring Boot', 'React', 'RESTful APIs', 'JWT'],
      achievements: [
        'Improved API response times by 30%',
        'Increased user engagement by 20%'
      ]
    },
    {
      title: 'Web development Intern',
      company: 'BrainDivision Solutions Pvt. Ltd.',
      period: 'June 2023 - July 2023',
      location: 'Hyderabad, Telangana',
      description: [
        'Created a responsive travel website using HTML, CSS, and JavaScript.',
        'Explored WordPress for CMS-based development.',
        'Enhanced UI/UX for better user engagement.',
        'Applied SEO optimizations to enhance website visibility and performance.'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'SEO'],
      achievements: [
        'Created a responsive travel website',
        'Enhanced UI/UX and website visibility'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science Engineering',
      school: 'Aditya Engineering College',
      period: '2021 - Present',
      location: 'Surampalem, Andhra Pradesh',
      description: 'Currently pursuing a Bachelor of Technology in Computer Science Engineering.',
      achievements: [
        'CGPA: 7.77/10.00',
        'Percentage: 70.00%'
      ],
      relevantCourses: []
    },
    {
      degree: 'Intermediate (MPC)',
      school: 'Narayana Junior College',
      period: '2019 - 2021',
      location: 'Kakinada, Andhra Pradesh',
      description: 'Completed Intermediate with Mathematics, Physics, and Chemistry.',
      achievements: [
        'Marks: 839/1000',
        'Percentage: 83.8%'
      ],
      relevantCourses: []
    },
    {
      degree: 'Secondary School Certificate',
      school: 'Presidency Public School',
      period: '2018 - 2019',
      location: 'Kakinada, Andhra Pradesh',
      description: 'Completed Secondary School Certificate.',
      achievements: [
        'GPA: 9.5/10',
        'Percentage: 95%'
      ],
      relevantCourses: []
    }
  ];

  const skills = [
    {
      category: 'Programming Languages',
      proficiencies: ['JavaScript', 'Java', 'TypeScript']
    },
    {
      category: 'Frameworks',
      proficiencies: ['React', 'React Native', 'Node.js', 'Express.js' ,'Spring Boot(learning)']
    },
    {
      category: 'Databases',
      proficiencies: ['MongoDB', 'MySQL',]
    },
    {
      category: 'Tools',
      proficiencies: ['Git&GitHub','Postman','Vs Code','Eclipse']
    },
    {
      category: 'Cloud & IoT',
      proficiencies: ['ESP32', 'Arduino', 'Firebase' ,'Supabase']
    },
    {
      category: 'UI/UX Design',
      proficiencies: ['Figma', 'canva']
    },
    {
      category: 'Agile Methodologies',
      proficiencies: ['Agile Scrum']
    },
    {
      category: 'Soft Skills',
      proficiencies: ['Communication', 'Teamwork', 'Problem Solving']
    }
  ];

  const iconPositions = useMemo(() => floatingIcons.map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  })), []);

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Floating Icons */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingIcons.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} opacity-10`}
            initial={{ 
              x: iconPositions[index].x,
              y: iconPositions[index].y,
            }}
            animate={{
              y: [0, -120, 0],
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 glass border border-white/10 shadow-2xl p-8 rounded-2xl"
        >
          <h1 className="text-4xl font-bold gradient-text mb-8 drop-shadow-lg">
            About Me
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-1 w-16 bg-[#64ffda] rounded-full"></div>
                  <span className="text-[#64ffda] font-semibold">About Me</span>
                </div>
                
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  I'm <span className="text-[#64ffda] font-semibold">Surya Sangadi</span>, an enthusiastic Software Engineer with expertise in MERN Stack, React Native, and Java Full Stack Development. I am passionate about AI & IoT, with hands-on experience in building innovative solutions. I am skilled in problem-solving and developing dynamic applications.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  My approach to development combines technical expertise with a focus
                  on user experience and clean code. I enjoy solving complex problems
                  and learning new technologies to stay at the forefront of web
                  development.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge through
                  technical writing and mentoring.
                </p>
                
                <motion.div 
                  className="flex flex-wrap gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                 
                </motion.div>
              </div>
            </div>
            
            <div className="md:col-span-5 order-1 md:order-2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#64ffda] to-purple-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.img
                      src="/images/profile.jpg"
                      alt="Surya Sangadi - Full Stack Developer"
                      className="rounded-xl w-full aspect-[3/4] object-cover object-center border-2 border-[#64ffda]/30"
                      style={{ maxHeight: "500px" }}
                      initial={{ filter: 'brightness(0.8)' }}
                      whileHover={{ filter: 'brightness(1)' }}
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-xl border-2 border-[#64ffda]/20 opacity-50"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-[#1a1a1a]/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#64ffda]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-[#64ffda] font-semibold">Full Stack Developer</div>
                  <div className="text-gray-400 text-sm">MERN | React Native | Java</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        {/* Divider */}
        <div className="h-1 w-32 mx-auto my-12 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-full opacity-40" />
        {/* Technical Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20 glass border border-white/10 shadow-2xl p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 drop-shadow-lg">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {skillCategory.category}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {skillCategory.proficiencies.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Divider */}
        <div className="h-1 w-32 mx-auto my-12 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-full opacity-40" />
        {/* Add Timeline after About Me and Skills sections */}
        <Suspense fallback={<div className="text-center text-[#64ffda] py-8">Loading...</div>}>
          <Timeline experiences={experiences} />
        </Suspense>
        {/* Divider */}
        <div className="h-1 w-32 mx-auto my-12 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-full opacity-40" />
        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20 glass border border-white/10 shadow-2xl p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 drop-shadow-lg">
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {exp.location}
                    </p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                {exp.achievements && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-600/10 text-primary-600 dark:text-primary-400 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Divider */}
        <div className="h-1 w-32 mx-auto my-12 bg-gradient-to-r from-[#64ffda] via-purple-400 to-[#64ffda] rounded-full opacity-40" />
        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass border border-white/10 shadow-2xl p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 drop-shadow-lg">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400">
                      {edu.school}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {edu.location}
                    </p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {edu.description}
                </p>
                {edu.achievements && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Achievements:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {edu.relevantCourses && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Relevant Courses:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course) => (
                        <span
                          key={course}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
});

export default About; 