import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  fps: number;
}

const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let frameCount = 0;
    let lastTime = startTime;

    const measurePerformance = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Calculate FPS
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;
        
        setMetrics(prev => ({
          ...prev,
          renderTime,
          memoryUsage: memoryUsage / 1024 / 1024, // Convert to MB
          fps,
        }));
      }
    };

    // Measure after render
    requestAnimationFrame(measurePerformance);

    // Show/hide based on development mode
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm"
    >
      <div className="space-y-1">
        <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Memory: {metrics.memoryUsage.toFixed(2)}MB</div>
        <div>FPS: {metrics.fps}</div>
      </div>
    </motion.div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
