import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/interactive/ScrollProgress';
import ParticleBackground from './components/interactive/ParticleBackground';
import CustomCursor from './components/interactive/CustomCursor';
import { AnimatePresence } from 'framer-motion';
import CodeLoader from './components/CodeLoader';
import FloatingActionButton from './components/interactive/FloatingActionButton';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CodeLoader />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
                    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0d1b2a] relative">
            <ParticleBackground />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <AnimatePresence mode="wait">
              <main className="flex-grow relative z-10">
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <CodeLoader />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
            </AnimatePresence>
            
            <FloatingActionButton />
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
