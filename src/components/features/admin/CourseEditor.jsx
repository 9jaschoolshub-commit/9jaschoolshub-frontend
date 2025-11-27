import FormInput from "../../global/FormInput";
import { X } from "lucide-react";

const CourseEditor = ({
  course,
  facultyIndex,
  courseIndex,
  handleCourseChange,
  removeCourse,
}) => {
  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md space-y-3 relative">
      <button
        type="button"
        onClick={() => removeCourse(facultyIndex, courseIndex)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        title="Remove Course"
      >
        <X size={18} />
      </button>
      <FormInput
        name="course"
        label="Course Name"
        value={course.course}
        handleInputChange={(name, value) =>
          handleCourseChange(facultyIndex, courseIndex, name, value)
        }
        placeholder="e.g. Computer Science"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />
      <textarea
        name="requirements"
        value={course.requirements}
        onChange={(e) => handleCourseChange(facultyIndex, courseIndex, 'requirements', e.target.value)}
        placeholder="Enter course requirements (JAMB, O'Level, Direct Entry...)"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px]"
      />
    </div>
  );
};

export default CourseEditor;
