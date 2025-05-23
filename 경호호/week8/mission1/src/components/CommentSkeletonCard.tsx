import React from 'react';

const CommentSkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-3 animate-pulse">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
      
      <div className="h-3 bg-gray-700 rounded w-20 mt-3"></div>
    </div>
  );
};

export default CommentSkeletonCard;
