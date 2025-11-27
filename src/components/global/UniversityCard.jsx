import { Eye, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const UniversityCard = ({
  _id,
  image,
  university_name,
  type,
  location,
  notable_programs,
  school_fees_range,
  website,
}) => {
  const courses = notable_programs?.flatMap((faculty) =>
    faculty.Courses.map((course) => course.course)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col">
      <figure className="h-48 ">
        <img
          src={image}
          alt={university_name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="px-2 py-4 text-gray-900 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-0.5">
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-lg font-semibold ">{university_name}</h3>
            {type && (
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  type === "Private"
                    ? "bg-blue-100 text-blue-800"
                    : type === "State"
                    ? "bg-pink-100 text-pink-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {type}
              </span>
            )}
          </div>
          <div className="flex items-center text-gray-00 text-base gap-1.5">
            <MapPin className="w-5 h-5 " />
            {location}
          </div>
        </div>
        <div className="flex justify-between gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-500">Programs</span>
            <div className="font-medium">{courses.length}</div>
          </div>
          <div>
            <span className="text-gray-500">Tuition Fee</span>
            <div className="font-medium">{school_fees_range || "N/A"}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {courses.slice(0, 3).map((course, index) => {
            return (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {course}
              </span>
            );
          })}
          {courses.length > 3 && (
            <span className="text-xs text-gray-500">
              +{courses.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 ">
          <Link to={`/university/${_id}`}>
            <button className="flex items-center gap-2 border border-orange-400 text-orange-400 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition cursor-pointer">
              <Eye className="w-5 h-5 text-orange-400" />
              <span>View Details</span>
            </button>
          </Link>
          <a href={`https://www.${website}`} target="_blank">
            <button className="flex bg-orange-400 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition cursor-pointer">
              Apply Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default UniversityCard;
