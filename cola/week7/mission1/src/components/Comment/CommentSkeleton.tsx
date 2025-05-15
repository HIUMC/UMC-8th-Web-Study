const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 px-5 py-3 bg-gray-700 rounded-lg animate-pulse">
        <div className="w-50 h-5 bg-gray-500 rounded-lg"></div>
        <div className="w-100 h-5 bg-gray-500 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
