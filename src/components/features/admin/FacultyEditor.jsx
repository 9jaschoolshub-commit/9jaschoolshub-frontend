import FormInput from "../../global/FormInput";
import CourseEditor from "./CourseEditor";
import { Plus, Trash2 } from "lucide-react";

const FacultyEditor = ({
  faculty,
  facultyIndex,
  handleFacultyChange,
  removeFaculty,
  addCourse,
  handleCourseChange,
  removeCourse,
}) => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <FormInput
          name="Faculty"
          label="Faculty Name"
          value={faculty.Faculty}
          handleInputChange={(name, value) =>
            handleFacultyChange(facultyIndex, name, value)
          }
          placeholder="e.g. Engineering & Technology"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <button
          type="button"
          onClick={() => removeFaculty(facultyIndex)}
          className="ml-4 mt-6 p-2 text-red-500 hover:bg-red-100 rounded-full"
          title="Remove Faculty"
        >
          <Trash2 />
        </button>
      </div>

      <div className="pl-4 border-l-4 border-orange-200 space-y-3">
        <h4 className="font-semibold text-gray-700">Courses</h4>
        {faculty.Courses.map((course, courseIndex) => (
          <CourseEditor
            key={courseIndex}
            course={course}
            facultyIndex={facultyIndex}
            courseIndex={courseIndex}
            handleCourseChange={handleCourseChange}
            removeCourse={removeCourse}
          />
        ))}
        <button
          type="button"
          onClick={() => addCourse(facultyIndex)}
          className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 cursor-pointer"
        >
          {" "}
          <Plus size={16} /> Add Course{" "}
        </button>
      </div>
    </div>
  );
};

export default FacultyEditor;
