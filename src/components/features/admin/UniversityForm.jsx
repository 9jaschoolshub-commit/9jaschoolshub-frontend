import FormInput from "../../global/FormInput";
import SelectFilterOption from "../../global/SelectFilterOption";
import filterData from "../../../data/filterData";

const UniversityForm = ({
  formData,
  handleChange,
  selectedUniversity,
  actionType,
}) => {
  const uniLocation = filterData.universityLocation;
  const uniType = filterData.universityType;

  const handleInputChange = (name, value) => {
    handleChange({ target: { name, value } });
  };

  const handleSelectChange = (setter, e) => {
    const { name, value } = e.target;
    // This component doesn't use setters, but we can adapt the call
    handleChange({ target: { name, value } });
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
        name="programmes"
        label="Courses Offered (comma-separated)"
        value={formData.programmes}
        handleInputChange={handleInputChange}
        placeholder="e.g. Computer Science, Medicine"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />

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
        placeholder="e.g. university.edu.ng"
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
          name="Address"
          label="University Address"
          value={formData.address}
          handleInputChange={handleInputChange}
          placeholder="e.g. 11, Crescent Rd..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="md:col-span-2">
        <FormInput
          name="requirements"
          label="Requirements (comma-separated)"
          value={formData.requirements}
          handleInputChange={handleInputChange}
          placeholder="General admission requirements"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

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
