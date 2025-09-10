import React, { useState, useEffect } from 'react';

const StartupAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Complete animation after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background dark:bg-dark-bg flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4">
            <img
              src="/logo192.png"
              alt="Deltasoft Logo"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-white font-bold text-4xl">DS</span>
            </div>
          </div>
        </div>


        {/* Loading Animation */}
        <div className="w-64 h-2 bg-surface dark:bg-dark-surface rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-text-secondary dark:text-dark-text-secondary text-sm">
          {progress}% - Loading...
        </p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default StartupAnimation;
