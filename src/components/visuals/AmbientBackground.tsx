import React, { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  isDarkMode: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Subtle atmospheric / botanical pollen particles
    const particleCount = 28;
    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      hue: number; // 140 (emerald green) or 40 (amber)
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35 + 0.15, // gentle drift rightward like wind
      vy: (Math.random() - 0.5) * 0.25 - 0.1,  // slight upward buoyant drift
      alpha: Math.random() * 0.25 + 0.08,
      hue: Math.random() > 0.35 ? 145 : 38, // predominantly agricultural green, occasional amber
    }));

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x > width + 10) p.x = -10;
          if (p.x < -10) p.x = width + 10;
          if (p.y > height + 10) p.y = -10;
          if (p.y < -10) p.y = height + 10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const lightness = isDarkMode ? 65 : 45;
        ctx.fillStyle = `hsla(${p.hue}, 65%, ${lightness}%, ${isDarkMode ? p.alpha * 0.7 : p.alpha * 0.55})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [isDarkMode]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Gentle ambient gradient orbs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-35 transition-all duration-700 ${
          isDarkMode ? 'bg-emerald-950/60' : 'bg-emerald-100/60'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-25 transition-all duration-700 ${
          isDarkMode ? 'bg-emerald-900/30' : 'bg-amber-100/40'
        }`}
      />
      <div
        className={`absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
          isDarkMode ? 'bg-teal-950/50' : 'bg-lime-100/50'
        }`}
      />

      {/* SVG Agricultural Topographic Elevation & Furrow Contours */}
      <svg
        className={`absolute inset-0 w-full h-full opacity-30 transition-opacity duration-500 ${
          isDarkMode ? 'stroke-emerald-500/10' : 'stroke-emerald-800/[0.04]'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern id="farm-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="0.75" />
            <circle cx="60" cy="0" r="1" fill="currentColor" className={isDarkMode ? 'text-emerald-500/15' : 'text-emerald-800/10'} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#farm-grid)" />
        {/* Subtle wavy elevation contours */}
        <path
          d="M0,120 Q320,180 640,110 T1280,140 T1920,100"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M0,450 Q380,390 760,460 T1520,420 T2280,470"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <path
          d="M0,820 Q420,890 840,810 T1680,850 T2520,800"
          strokeWidth="1.2"
        />
      </svg>

      {/* Canvas for gentle wind/pollen particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
