import React from 'react';

const Skeleton = ({ className = '', count = 1 }) => {
  const elements = Array.from({ length: count });

  return (
    <>
      {elements.map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl ${className}`}
        />
      ))}
    </>
  );
};

export default Skeleton;
