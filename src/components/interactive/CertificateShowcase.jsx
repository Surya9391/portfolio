import React from 'react';
import { motion } from 'framer-motion';

const CertificateShowcase = () => {
  const certificates = [
    {
      id: 1,
      title: "Java (Basics)",
      issuer: "Hackerrank",
      date: "2025",
      image: "/certificates/java.jpg",
      credentialUrl: "https://drive.google.com/file/d/1IgEL3_u5a_6PgPFUgCjPCtsbnfbT1i_e/view?usp=sharing",
      skills: ["Java", "OOP", "Data Structures"],
      description: "Comprehensive Java programming certification covering core concepts and best practices."
    },
    {
      id: 2,
      title: "Introduction to IoT",
      issuer: "Cisco",
      date: "2022",
      image: "/certificates/iot.jpg",
      credentialUrl: "https://drive.google.com/file/d/1hE3sjVk051vIyppm_E92Q-Ay-9XB4vP_/view?usp=sharing",
      skills: ["IOT", "Networking", "Automation"],
      description: "Professional certification for IoT development and deployment."
    },
    {
      id: 3,
      title: "Programming Essentials in Python",
      issuer: "Python Institute",
      date: "2022",
      image: "/certificates/python.jpg",
      credentialUrl: "https://drive.google.com/file/d/1d51Qd1GPldiuE8KQQzZH-gzSrZRCrdmK/view?usp=sharing",
      skills: ["Python", "Machine Learning"],
      description: "Comprehensive Python programming certification covering essential concepts and libraries."
    },
    {
      id: 4,
      title: "SQL (Intermediate)",
      issuer: "Hackerrank",
      date: "2025",
      image: "/certificates/sql.jpg",
      credentialUrl: "https://drive.google.com/file/d/1RM-2xZuu_9Yv9M_p37ZL5GC3S8SfzMg6/view?usp=sharing",
      skills: ["SQL", "Database Management", "Data Analysis"],
      description: "Intermediate SQL certification focusing on complex queries and database management."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#0d1b2a]/50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-[#415a77] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6">
                      <p className="text-white text-sm mb-2">{cert.description}</p>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#64ffda] hover:text-[#64ffda]/80 transition-colors"
                      >
                        Verify Certificate
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#64ffda]">{cert.issuer}</span>
                    <span className="text-gray-400">{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#64ffda]/10 text-[#64ffda] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateShowcase; 