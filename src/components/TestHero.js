import React from 'react';

const TestHero = () => {
  return (
    <div className="relative h-80 md:h-96 lg:h-[40vh] overflow-hidden bg-gray-200 dark:bg-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Deltasoft</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Test Hero Component - Working!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestHero;
