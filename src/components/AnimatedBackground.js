import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-darker"></div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `
                 linear-gradient(to right, rgba(46, 255, 0, 0.08) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(46, 255, 0, 0.08) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px',
               animation: 'grid-move 20s linear infinite'
             }}>
        </div>
      </div>

      {/* Enhanced floating particles with color cycling */}
      <div className="particle-container">
        {[...Array(40)].map((_, i) => {
          const hue = Math.floor(Math.random() * 60 + 100); // greenish
          return (
            <div
              key={i}
              className="particle"
              style={{
                '--particle-size': `${Math.random() * 4 + 2}px`,
                '--particle-delay': `${Math.random() * 8}s`,
                '--particle-duration': `${Math.random() * 12 + 10}s`,
                '--particle-left': `${Math.random() * 100}%`,
                '--particle-hue': hue,
              }}
            ></div>
          );
        })}
      </div>

      {/* Dynamic glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-pulse orb-1"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-pulse orb-2"></div>

      {/* Moving gradient lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
             background: `
               repeating-linear-gradient(
                 60deg,
                 transparent,
                 transparent 120px,
                 rgba(46, 255, 0, 0.12) 120px,
                 rgba(46, 255, 0, 0.12) 240px
               )
             `,
             animation: 'lines-move 18s linear infinite'
           }}>
      </div>

      {/* Slow-moving gradient overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'linear-gradient(120deg, rgba(46,255,0,0.08) 0%, rgba(0,0,0,0.12) 100%)',
             animation: 'gradient-move 30s ease-in-out infinite alternate'
           }}></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-darker/60 to-darker"></div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes lines-move {
          0% { background-position: 0 0; }
          100% { background-position: 120px 120px; }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .particle-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          width: var(--particle-size);
          height: var(--particle-size);
          background: hsl(var(--particle-hue, 120), 100%, 60%);
          opacity: 0.7;
          border-radius: 50%;
          left: var(--particle-left);
          top: -10px;
          animation: float var(--particle-duration) ease-in infinite;
          animation-delay: var(--particle-delay);
          filter: blur(1.5px);
        }
        @keyframes float {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .orb-1 {
          animation: orb-move-1 18s ease-in-out infinite alternate;
        }
        .orb-2 {
          animation: orb-move-2 22s ease-in-out infinite alternate;
        }
        @keyframes orb-move-1 {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.15) translate(40px, -30px); }
        }
        @keyframes orb-move-2 {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-30px, 40px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground; 