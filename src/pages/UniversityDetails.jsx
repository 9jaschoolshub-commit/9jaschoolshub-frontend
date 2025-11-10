import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { universityAPI } from "../services/universityApi";
// import { useSingleUniversity } from "../hooks/useQueries";

/**
 * Todo
 * Refactor component to use useSingleUniversity for api operations
 */

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // Number of programmes to show initially

  // Function to handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Increase the count by 6
  };

  useEffect(() => {
    if (!id) return;

    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const res = await universityAPI.getUniversityById(id);
        setUniversity(res.data.university);
      } catch (err) {
        console.error("Failed to load university data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            University Not Found
          </h2>
          <p className="text-gray-500">Try again or check the ID in the URL.</p>
        </div>
      </div>
    );
  }

  const courses = university.notable_programs.flatMap((faculty) =>
    faculty.Courses.map((course) => course.course)
  );

  // console.log(courses);

  return (
    <div className="min-h-screen p-6 mx-auto w-full">
      {/* Basic Info */}
      <div className="flex max-w-5xl items-center text-gray-600 text-sm mb-4 font-semibold">
        <Link to="/universities" className="">
          Home
        </Link>
        <span className="mx-2">
          <ChevronRight />
        </span>
        <p>Courses</p>
      </div>

      {university && (
        <>
          <div className="flex flex-col gap-8 w-full">
            <div className="bg-gray-100 px-6 md:px-20 flex flex-col sm:flex-row justify-center items-center gap-10 py-6 mx-auto w-full md:w-1/2 rounded-md">
              <img src={university.image} alt={university.university_name} />
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
            <div className="p-10 bg-gray-100 rounded-md">
              <div className="max-w-5xl mx-auto flex flex-col justify-center items-center gap-6">
                <h2 className="text-xl md:text-2xl font-semibold text-black">
                  Courses Offered in {university.university_name}
                </h2>
                <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                  {courses.slice(0, visibleCount).map((course, index) => (
                    <Link
                      key={index}
                      to={`/courses?search=${encodeURIComponent(course)}`}
                      className="bg-blue-200 text-sm px-3 py-2 text-center rounded-md m-1 max-w-52 cursor-pointer hover:bg-blue-300 transition"
                    >
                      {course}
                    </Link>
                  ))}
                </div>
                {visibleCount < courses.length && (
                  <button
                    onClick={handleShowMore}
                    className="mt-4 bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Show More
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white py-12 border-t-4 border-gray-300">
            <p className="w-full text-center">
              Click on a course for subject combination, entry requirements and
              special waivers, basically more details about the course.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityDetails;
