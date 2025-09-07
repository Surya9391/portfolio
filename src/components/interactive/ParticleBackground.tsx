import React, { useEffect, useRef, useCallback, memo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const createParticle = useCallback((): Particle => ({
    id: Math.random(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2,
    color: `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.1})`,
  }), []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particleCount = window.innerWidth < 768 ? 30 : 50;
    particlesRef.current = Array.from({ length: particleCount }, createParticle);
  }, [createParticle]);

  const updateParticle = useCallback((particle: Particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around screen
    if (particle.x > window.innerWidth) particle.x = 0;
    if (particle.x < 0) particle.x = window.innerWidth;
    if (particle.y > window.innerHeight) particle.y = 0;
    if (particle.y < 0) particle.y = window.innerHeight;
  }, []);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = dx * dx + dy * dy;

        if (distance < 10000) { // 100 * 100
          const opacity = 0.1 * (1 - Math.sqrt(distance) / 100);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Throttle to 30 FPS for better performance
    if (currentTime - lastTimeRef.current < 33) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      updateParticle(particle);
      drawParticle(ctx, particle);
    });

    // Draw connections
    drawConnections(ctx, particlesRef.current);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticle, drawConnections]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    particlesRef.current.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100;
        particle.speedX -= Math.cos(angle) * force * 0.5;
        particle.speedY -= Math.sin(angle) * force * 0.5;
      }
    });
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    initParticles();

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Add event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, handleResize, handleMouseMove, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
