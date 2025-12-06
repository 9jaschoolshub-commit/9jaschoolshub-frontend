import FormInput from "../../global/FormInput";
import SelectFilterOption from "../../global/SelectFilterOption";
import filterData from "../../../data/filterData";
import FacultyEditor from "./FacultyEditor";
import { Plus } from "lucide-react";

const UniversityForm = ({
  formData,
  handleChange,
  selectedUniversity,
  actionType,
  setFormData,
}) => {
  const uniLocation = filterData.universityLocation;
  const uniType = filterData.universityType;

  const handleInputChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

  const handleSelectChange = (setter, e) => {
    // The setter is ignored here as AdminDashboard's handleChange handles state update.
    handleChange(e);
  };

  // --- Dynamic Form Handlers for Notable Programs ---

  const handleFacultyChange = (facultyIndex, field, value) => {
    const updatedPrograms = [...formData.notable_programs];
    updatedPrograms[facultyIndex][field] = value;
    setFormData({ ...formData, notable_programs: updatedPrograms });
  };

  const handleCourseChange = (facultyIndex, courseIndex, field, value) => {
    const updatedPrograms = [...formData.notable_programs];
    updatedPrograms[facultyIndex].Courses[courseIndex][field] = value;
    setFormData({ ...formData, notable_programs: updatedPrograms });
  };

  const addFaculty = () => {
    setFormData({
      ...formData,
      notable_programs: [
        ...formData.notable_programs,
        { Faculty: "", Courses: [] },
      ],
    });
  };

  const removeFaculty = (facultyIndex) => {
    const updatedPrograms = formData.notable_programs.filter(
      (_, i) => i !== facultyIndex
    );
    setFormData({ ...formData, notable_programs: updatedPrograms });
  };

  const addCourse = (facultyIndex) => {
    const updatedPrograms = [...formData.notable_programs];
    updatedPrograms[facultyIndex].Courses.push({
      course: "",
      requirements: "",
    });
    setFormData({ ...formData, notable_programs: updatedPrograms });
  };

  const removeCourse = (facultyIndex, courseIndex) => {
    const updatedPrograms = [...formData.notable_programs];
    updatedPrograms[facultyIndex].Courses = updatedPrograms[
      facultyIndex
    ].Courses.filter((_, i) => i !== courseIndex);
    setFormData({ ...formData, notable_programs: updatedPrograms });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
      <FormInput
        name="unversityName"
        label="University Name"
        value={formData.unversityName}
        handleInputChange={handleInputChange}
        placeholder="Enter university name"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

      <div className="space-y-1.5">
        <label htmlFor="type" className="text-xs md:text-sm mr-2">
          University Type
        </label>
        <SelectFilterOption
          name="type"
          value={formData.type}
          onChange={handleSelectChange}
          options={uniType}
          label="Select Type"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="location" className="text-xs md:text-sm mr-2">
          Location
        </label>
        <SelectFilterOption
          name="location"
          value={formData.location}
          onChange={handleSelectChange}
          options={uniLocation}
          label="Select Location"
        />
      </div>

      <FormInput
        name="schoolFees"
        label="Tuition Fee Range"
        value={formData.schoolFees}
        handleInputChange={handleInputChange}
        placeholder="e.g. ₦100,000 - ₦500,000"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

      <FormInput
        name="website"
        label="University Website"
        value={formData.website}
        handleInputChange={handleInputChange}
        placeholder="e.g. https://university.edu.ng"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

      <FormInput
        name="email"
        label="University Email(s)"
        value={formData.email}
        handleInputChange={handleInputChange}
        placeholder="e.g. info@university.edu.ng"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

      <FormInput
        name="phone"
        label="Phone Number(s)"
        value={formData.phone}
        handleInputChange={handleInputChange}
        placeholder="e.g. +234..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

      <div className="md:col-span-2">
        <FormInput
          name="notes"
          label="Notes"
          value={formData.notes}
          handleInputChange={handleInputChange}
          placeholder="Any additional notes"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* --- Notable Programs Dynamic Editor --- */}
      <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg border">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Faculties & Courses
        </h3>
        <div className="space-y-4">
          {formData.notable_programs?.map((faculty, facultyIndex) => (
            <FacultyEditor
              key={facultyIndex}
              faculty={faculty}
              facultyIndex={facultyIndex}
              handleFacultyChange={handleFacultyChange}
              removeFaculty={removeFaculty}
              addCourse={addCourse}
              handleCourseChange={handleCourseChange}
              removeCourse={removeCourse}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={addFaculty}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-800 cursor-pointer"
        >
          {" "}
          <Plus size={16} /> Add Faculty{" "}
        </button>
      </div>
      {/* --- End Notable Programs --- */}

      <div className="md:col-span-2">
        <div className="space-y-1.5">
          <label htmlFor="image" className="text-xs md:text-sm">
            University Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            className="w-full text-sm md:text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </div>
        {selectedUniversity?.image && actionType === "update" && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mt-1 mb-2">
              Current image (uploading a new one will replace it)
            </p>
            <img
              src={selectedUniversity.image}
              alt="Current university"
              className="h-48 w-full object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityForm;
