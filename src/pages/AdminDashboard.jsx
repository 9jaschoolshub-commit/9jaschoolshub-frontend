import { useState, useEffect } from "react";
import { universityAPI } from "../services/universityApi";
import { getApiKeyFromServer } from "../services/apiKeyService";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import AdminHeader from "../components/features/admin/AdminHeader";
import UniversitySearch from "../components/features/admin/UniversitySearch";
import UniversityForm from "../components/features/admin/UniversityForm";
import SignedOutView from "../components/features/admin/SignedOutView";
import useStore from "../hooks/useStore";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    universityId: "",
    unversityName: "",
    type: "Federal",
    location: "Lagos",
    notable_programs: [],
    schoolFees: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const { getToken, isSignedIn } = useAuth();
  const setAuthToken = useStore((state) => state.setAuthToken);
  const setApiKey = useStore((state) => state.setApiKey);

  const actionTypes = [
    { option: "add", label: "Add University" },
    { option: "update", label: "Update University" },
    { option: "delete", label: "Delete University" },
  ];

  useEffect(() => {
    const setup = async () => {
      if (isSignedIn) {
        try {
          // Get auth token from Clerk and save to Zustand
          const authToken = await getToken();
          setAuthToken(authToken);
          // Then call getApiKeyFromServer() to get apikey from the server
          await getApiKeyFromServer();
        } catch (error) {
          toast.error("Failed to initialize admin session.");
          console.error("error message:", error);
        }
      } else {
        setAuthToken(null);
        setApiKey(null);
      }
    };
    setup();
  }, [isSignedIn, getToken]);

  const handleChange = (e) => {
    if (!e.isTrusted) {
      return;
    }

    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Clear selected university and results if search query changes
    setSelectedUniversity(null);
    setSearchResults([]);
  };

  const handleSearch = async (query) => {
    if (!query || !query.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const results = await universityAPI.searchUniversities(query);
      // console.log("search results:", results);

      setSearchResults(results.data.doc || []);
    } catch (error) {
      if (error.message === "No universities match your search criteria.") {
        setSearchResults([]); // Ensure results are cleared
        toast.info("No universities found matching your search.");
      } else {
        toast.error("Failed to search university.");
        console.error("Search error:", error);
        setSearchResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
    setFormData({
      universityId: university._id,
      unversityName: university.university_name,
      type: university.type,
      location: university.location,
      notable_programs: university.notable_programs || [], // Use the actual nested array
      schoolFees: university.school_fees_range,
      website: university.website,
      email: university.email,
      phone: university.phone_number,
      address: university.address,
      notes: university.notes,
      image: null,
    });
  };

  const handleCsvUpload = () => {
    // This is a placeholder for the CSV upload logic.

    toast.info("CSV upload functionality is not yet implemented.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (actionType === "add") {
        const payload = new FormData();
        payload.append("UniversityName", formData.unversityName);
        payload.append("type", formData.type);
        payload.append("location", formData.location);
        payload.append(
          "notable_programs",
          JSON.stringify(formData.notable_programs)
        );
        payload.append("schoolFees", formData.schoolFees);
        payload.append("website", formData.website);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("address", formData.address);
        payload.append("notes", formData.notes);
        if (formData.image) {
          payload.append("image", formData.image);
        }

        await universityAPI.createUniversity(payload);
        toast.success("University created successfully!");
        resetForm();
      } else if (actionType === "update") {
        if (!formData.universityId) {
          toast.error("Please enter a University to update.");
          return;
        }

        const payload = new FormData();

        // Compare formData with selectedUniversity and append only changed fields
        if (formData.unversityName !== selectedUniversity.university_name) {
          payload.append("UniversityName", formData.unversityName);
        }
        if (formData.type !== selectedUniversity.type) {
          payload.append("type", formData.type);
        }
        if (formData.location !== selectedUniversity.location) {
          payload.append("location", formData.location);
        }

        payload.append(
          "notable_programs",
          JSON.stringify(formData.notable_programs)
        );
        if (formData.schoolFees !== selectedUniversity.school_fees_range) {
          payload.append("schoolFees", formData.schoolFees);
        }

        if (formData.website !== selectedUniversity.website) {
          payload.append("website", formData.website);
        }
        if (formData.email !== selectedUniversity.email) {
          payload.append("email", formData.email);
        }
        if (formData.phone !== selectedUniversity.phone_number) {
          payload.append("phone", formData.phone);
        }
        if (formData.address !== selectedUniversity.address) {
          payload.append("phone", formData.address);
        }
        if (formData.notes !== selectedUniversity.notes) {
          payload.append("notes", formData.notes);
        }
        if (formData.image) {
          payload.append("image", formData.image);
        }

        await universityAPI.updateUniversity(formData.universityId, payload);
        toast.success("University updated successfully!");
        resetForm();
      } else if (actionType === "delete") {
        if (!formData.universityId) {
          toast.error("Please enter a University ID to delete.");
          return;
        }
        if (
          window.confirm("Are you sure you want to delete this university?")
        ) {
          await universityAPI.deleteUniversity(formData.universityId);
          toast.success("University deleted successfully!");
          resetForm();
        }
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${actionType} university`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      universityId: "",
      unversityName: "",
      type: "Federal",
      location: "Lagos",
      notable_programs: [],
      schoolFees: "",
      website: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      image: null,
    });
    setSelectedUniversity(null);
    setSearchResults([]);
    setSearchQuery("");
  };

  // Determine if the university details form should be shown
  const showUniversityDetailsForm =
    actionType === "add" || selectedUniversity !== null;

  return (
    <div>
      <SignedOut>
        <SignedOutView />
      </SignedOut>
      <SignedIn>
        <div className="p-2 md:p-5 max-w-7xl mx-auto">
          <AdminHeader
            actionType={actionType}
            setActionType={setActionType}
            resetForm={resetForm}
            actionTypes={actionTypes}
          />

          {(actionType === "update" || actionType === "delete") && (
            <UniversitySearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              handleSearch={handleSearch}
              loading={loading}
              searchResults={searchResults}
              handleSelectUniversity={handleSelectUniversity}
            />
          )}

          {showUniversityDetailsForm && (
            <form onSubmit={handleSubmit}>
              {actionType !== "delete" && (
                <UniversityForm
                  formData={formData}
                  handleChange={handleChange}
                  selectedUniversity={selectedUniversity}
                  setFormData={setFormData}
                  actionType={actionType}
                />
              )}

              <div className="flex justify-between items-center mt-6">
                {actionType === "add" && (
                  <button
                    type="button"
                    onClick={handleCsvUpload}
                    className="flex items-center text-orange-400 px-2 md:px-4 py-2 rounded border border-orange-400 hover:bg-gray-100 cursor-pointer"
                  >
                    Upload CSV of Universities
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    actionType === "delete"
                      ? "bg-red-600 hover:bg-red-800"
                      : "bg-orange-400 hover:bg-orange-700"
                  } text-white px-2 md:px-4 py-3 rounded-lg cursor-pointer ml-auto font-semibold`}
                >
                  {loading
                    ? "Submitting..."
                    : actionType === "delete"
                    ? "Delete University"
                    : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </SignedIn>
    </div>
  );
}
