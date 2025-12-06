import { X } from "lucide-react";

const CourseRequirementsModal = ({ isOpen, onClose, courseData }) => {
  if (!isOpen || !courseData) return null;

  // Split requirements into logical sections for better readability
  const requirementsSections = courseData.requirements?.split(/(O'Level Requirements,|Direct Entry Requirements,|Subject Combination \/ JAMB UTME Requirements)/).filter(Boolean);

  return (
    <div
      className="fixed inset-0 bg-gradient-to-t from-orange-50/30 to-blue-900/40 transition-opacity duration-300 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl px-2 py-4 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">{courseData.name.toUpperCase()}</h2>
          <button
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-600 hover:text-orange-400 transition-colors cursor-pointer" />
          </button>
        </div>
        <div className="prose max-w-none text-gray-700">
          {requirementsSections?.map((section, index) => {
             if (["O'Level Requirements,", "Direct Entry Requirements,", "Subject Combination / JAMB UTME Requirements"].includes(section.trim())) {
                return <h3 key={index} className="text-xl font-semibold text-gray-700 mt-4">{section}</h3>
             }
             return <p key={index} className="text-sm md:text-base">{section}</p>
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseRequirementsModal;
