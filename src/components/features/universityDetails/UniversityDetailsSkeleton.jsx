export default function UniversityDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Skeleton for Breadcrumbs */}
      <div className="flex max-w-5xl items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 w-4 mx-2 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        {/* Skeleton for Basic Info */}
        <div className="bg-gray-100 px-6 md:px-16 flex flex-col md:flex-row justify-center gap-10 md:gap-32 py-6 mx-auto rounded-md w-full">
          <div className="bg-gray-300 rounded-md h-52 w-full md:w-1/3"></div>
          <div className="flex flex-col items-start gap-3 w-full md:w-1/2">
            <div className="h-7 bg-gray-300 rounded w-3/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-40 mt-2"></div>
          </div>
        </div>

        {/* Skeleton for Courses Offered */}
        <div className="p-10 bg-gray-100 rounded-md">
          <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6">
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="place-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-300 rounded-md w-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
