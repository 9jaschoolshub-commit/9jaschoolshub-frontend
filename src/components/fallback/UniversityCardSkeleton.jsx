const UniversityCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-xl w-full mx-auto animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default UniversityCardSkeleton;