import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  Eye,
  MapPin,
  Building2,
  Wallet,
  ExternalLink,
  NotebookText,
} from "lucide-react";
import UniversityDetailsSkeleton from "../components/features/universityDetails/UniversityDetailsSkeleton";
import { useSingleUniversity } from "../hooks/useQueries";
import CourseRequirementsModal from "../components/features/universityDetails/CourseRequirementsModal";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const handleViewRequirements = (courseName) => {
    let foundCourse = null;
    university?.notable_programs.forEach((faculty) => {
      const course = faculty.Courses.find((c) => c.course === courseName);
      if (course) {
        foundCourse = {
          name: course.course,
          requirements: course.requirements,
        };
      }
    });
    if (foundCourse) {
      setSelectedCourse(foundCourse);
      setModalOpen(true);
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

  const allCourses =
    university?.notable_programs?.flatMap((faculty) =>
      faculty.Courses.map((course) => course.course)
    ) || [];

  return (
    <div className="min-h-screen p-6 mx-auto w-full">
      {isLoading && <UniversityDetailsSkeleton />}

      {/* Basic Info */}
      <div className="flex max-w-5xl items-center text-gray-600 text-sm mb-4 font-semibold">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <span className="mx-2">
          <ChevronRight />
        </span>
        <span className="text-[#F49E0B]">{university?.university_name}</span>
      </div>

      {!isLoading && university && (
        <>
          <div className="flex flex-col gap-8 w-full">
            {/* University Header Card */}
            <div className="w-full flex md:px-72 justify-around flex-col md:flex-row">
              <img
                src={university.image}
                alt={university.university_name}
                className="w-full md:w-1/3 h-52 md:h-auto object-cover rounded-md"
              />
              <div className="flex flex-col p-6 md:p-8">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
                  {university.university_name}
                </h1>
                <div className="mt-4 space-y-3 text-gray-800">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span className="text-base">{university.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    <span className="text-base">
                      {university.type} University
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5" />
                    <span className="text-base">
                      {university.school_fees_range}
                    </span>
                  </div>
                  {university.notes && (
                    <div className="flex items-center gap-3">
                      <NotebookText className="w-5 h-5" />
                      <span className="text-base">{university.notes}</span>
                    </div>
                  )}
                </div>
                <a
                  href={
                    university.website.startsWith("https://")
                      ? university.website
                      : `https://${university.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 text-white font-semibold bg-orange-400 px-5 py-3 rounded-lg hover:bg-orange-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  View Official Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Courses Offered */}
            <div className="p-5 md:p-10 bg-gray-100 rounded-md">
              <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6">
                <h2 className="text-xl md:text-2xl font-semibold text-black text-center">
                  Courses Offered ({allCourses.length})
                </h2>
                <div className="place-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                  {allCourses.slice(0, visibleCount).map((course, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg flex items-center group w-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Link
                        to={`/courses?search=${encodeURIComponent(course)}`}
                        className="flex-grow p-3 text-xs md:text-sm text-center text-gray-800 hover:text-orange-500 transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {course}
                      </Link>
                      <button
                        onClick={() => handleViewRequirements(course)}
                        className="p-3 border-l border-gray-200 text-gray-500 hover:bg-blue-100 hover:text-blue-600 rounded-r-lg transition-colors"
                        title="View Requirements"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-5">
                  {visibleCount < allCourses.length && (
                    <button
                      onClick={handleShowMore}
                      className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
                    >
                      Show More
                    </button>
                  )}
                  {allCourses.length >
                    (screenSize >= 1024 ? 8 : screenSize >= 768 ? 6 : 4) &&
                    allCourses.length < visibleCount && (
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
      <CourseRequirementsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        courseData={selectedCourse}
      />
    </div>
  );
};

export default UniversityDetails;
