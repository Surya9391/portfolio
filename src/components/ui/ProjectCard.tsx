import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../constants';
import LazyImage from '../ui/LazyImage';

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageError?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index, onImageError }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    onImageError?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
      }}
      className="h-full"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-[#64ffda]/20 transition-all duration-300 h-full flex flex-col">
        {/* Project Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-800 relative group overflow-hidden h-56">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 object-center"
            fallback="/images/placeholder.png"
            width={400}
            quality={85}
            onError={handleImageError}
          />
          
          {/* Hover Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ opacity: 1 }}
          >
            <div className="absolute bottom-0 p-6 w-full">
              {project.stats && (
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
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {project.title}
          </h3>
          
          <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-gradient-to-r from-[#64ffda]/20 to-purple-500/20 text-[#64ffda] rounded-full text-xs font-medium border border-[#64ffda]/30"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(100, 255, 218, 0.3)"
                }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <ul className="mb-4 space-y-2">
              {project.features.slice(0, 2).map((feature) => (
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
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-auto">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </motion.a>
            
            {project.liveUrl && project.liveUrl !== '#' && (
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
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

