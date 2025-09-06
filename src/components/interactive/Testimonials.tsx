import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Product Manager',
    feedback: 'Working with Surya was a fantastic experience. The project was delivered on time and exceeded expectations!',
    avatar: '/images/avatar1.jpg',
  },
  {
    name: 'John Smith',
    role: 'CTO, TechCorp',
    feedback: 'Surya is a highly skilled developer with a keen eye for detail. Highly recommended!',
    avatar: '/images/avatar2.jpg',
  },
  {
    name: 'Emily Johnson',
    role: 'Designer',
    feedback: 'Creative, reliable, and always delivers quality work. Would love to collaborate again!',
    avatar: '/images/avatar3.jpg',
  },
];

const Testimonials = () => (
  <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
    <div className="max-w-4xl mx-auto px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What People Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="bg-white/5 rounded-xl p-8 shadow-xl border border-white/10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-[#64ffda]" />
            <p className="text-gray-300 mb-4">"{t.feedback}"</p>
            <span className="font-semibold text-[#64ffda]">{t.name}</span>
            <span className="text-sm text-gray-400">{t.role}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 