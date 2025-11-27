import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import UniversityDetailsSkeleton from "../components/features/universityDetailsPage/UniversityDetailsSkeleton";
import { useSingleUniversity } from "../hooks/useQueries";

const UniversityDetails = () => {
  const { id } = useParams();
  const {
    data: universityDetailsResponse,
    isLoading,
    isError,
  } = useSingleUniversity(id);

  const university = universityDetailsResponse?.data?.university;
  const [visibleCount, setVisibleCount] = useState(4); // Number of programmes to show initially
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // updating screen size as window size changes
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // using updated screen size to set visible count
  useEffect(() => {
    if (screenSize >= 1024) {
      setVisibleCount(8);
    } else if (screenSize >= 768) {
      setVisibleCount(6);
    } else {
      setVisibleCount(4);
    }
  }, [screenSize]);

  const handleShowMore = () => {
    if (screenSize >= 1024) {
      setVisibleCount((prevCount) => prevCount + 8); // Increase the count by depending on screen size
    } else if (screenSize >= 768) {
      setVisibleCount((prevCount) => prevCount + 6);
    } else {
      setVisibleCount((prevCount) => prevCount + 4);
    }
  };

  const handleShowLess = () => {
    if (screenSize >= 1024) {
      setVisibleCount(4);
    } else if (screenSize >= 768) {
      setVisibleCount(3);
    } else {
      setVisibleCount(2);
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen p-6 mx-auto w-full flex justify-center items-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700">
            University Not Found
          </h2>
          <p className="text-gray-500">Try again or check the ID in the URL.</p>
        </div>
      </div>
    );
  }

  const courses = university?.notable_programs?.flatMap((faculty) =>
    faculty.Courses.map((course) => course.course)
  );

  return (
    <div className="min-h-screen p-6 mx-auto w-full">
      {isLoading && <UniversityDetailsSkeleton />}
      {/* Basic Info */}
      <div className="flex max-w-5xl items-center text-gray-600 text-sm mb-4 font-semibold">
        <Link to="/" className="">
          Home
        </Link>
        <span className="mx-2">
          <ChevronRight />
        </span>
        <span className="text-[#F49E0B]">{university?.university_name}</span>
      </div>

      {university && (
        <>
          <div className="flex flex-col gap-8 w-full">
            <div className="bg-gray-100 px-6 md:px-16 flex flex-col md:flex-row justify-center gap-10 md:gap-32 py-6 mx-auto rounded-md">
              <img
                src={university.image}
                alt={university.university_name}
                className="rounded-md h-50 w-100 object-cover"
              />
              <div className="flex flex-col items-start gap-1 text-sm sm:text-base">
                <h1 className="text-lg sm:text-2xl font-semibold text-black">
                  {university.university_name}
                </h1>
                <p className="text-gray-600">{university.location}</p>
                <p className="text-gray-600">{university.type}</p>
                <p className="text-gray-600">{university.school_fees_range}</p>
                <a
                  href={
                    university.website.startsWith("https://")
                      ? university.website
                      : `https://${university.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="my-1 text-white text-sm bg-[#F49E0B] px-3 py-2.5 rounded-md"
                >
                  View Official Website
                </a>
              </div>
            </div>
            {/* Courses Offered */}
            <div className="p-5 md:p-10 bg-gray-100 rounded-md">
              <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6">
                <h2 className="text-xl md:text-2xl font-semibold text-black text-center">
                  Courses Offered ({courses.length})
                </h2>
                <div className="place-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                  {courses.slice(0, visibleCount).map((course, index) => (
                    <Link
                      key={index}
                      to={`/courses?search=${encodeURIComponent(course)}`}
                      className="bg-blue-200 h-10 w-36 md:w-48 p-3 text-xs md:text-sm flex items-center justify-center text-center rounded-md m-1 max-w-52 cursor-pointer hover:bg-blue-300 transition overflow-hidden"
                    >
                      {course}
                    </Link>
                  ))}
                </div>
                <div className="flex gap-5">
                  {visibleCount < courses.length && (
                    <button
                      onClick={handleShowMore}
                      className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
                    >
                      Show More
                    </button>
                  )}
                  {courses.length < visibleCount && (
                    <button
                      onClick={handleShowLess}
                      className="mt-4 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition cursor-pointer"
                    >
                      Show Less
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityDetails;
