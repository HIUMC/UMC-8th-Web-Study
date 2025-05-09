import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-24 bg-gray-700"></div>
      <div className="p-4">
      </div>
    </div>
  );
};

export default SkeletonCard;
