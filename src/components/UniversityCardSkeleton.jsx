const UniversityCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg animate-pulse">
      <div className="h-48 bg-gray-300 rounded-t-lg" />
      <div className="px-2 py-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2 " />
            <div className="h-5 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-1/2 " />
            <div className="h-5 bg-gray-300 rounded w-3/4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-5 bg-gray-300 rounded" />
          <div className="h-5 bg-gray-300 rounded" />
          <div className="h-5 bg-gray-300 rounded" />
          <div className="h-5 bg-gray-300 rounded" />
        </div>
        <div className="flex justify-between gap-2">
          <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  )
}

export default UniversityCardSkeleton
