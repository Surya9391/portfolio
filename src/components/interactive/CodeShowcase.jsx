import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const codeExamples = [
    {
      title: "React Component",
      language: "jsx",
      code: `const InteractiveCard = ({ title, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0
      }}
    >
      <h2>{title}</h2>
      {children}
    </motion.div>
  );
};`,
      description: "A reusable React component with hover animations using Framer Motion."
    },
    {
      title: "API Integration",
      language: "typescript",
      code: `interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUserData(id: string): Promise<User> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error('User not found');
    
    const userData = await response.json();
    return userData as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`,
      description: "TypeScript implementation of a type-safe API integration."
    },
    {
      title: "Custom Hook",
      language: "javascript",
      code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = 
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`,
      description: "A custom React hook for managing localStorage with type safety."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d1b2a]/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#64ffda] to-[#415a77] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Code Showcase
        </motion.h2>

        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex border-b border-white/10">
            {codeExamples.map((example, index) => (
              <button
                key={example.title}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'text-[#64ffda] border-b-2 border-[#64ffda]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-300 mb-4">
                  {codeExamples[activeTab].description}
                </p>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64ffda] to-[#415a77] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                  <div className="relative">
                    <SyntaxHighlighter
                      language={codeExamples[activeTab].language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        background: '#1a1a1a',
                      }}
                      showLineNumbers
                    >
                      {codeExamples[activeTab].code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase; 