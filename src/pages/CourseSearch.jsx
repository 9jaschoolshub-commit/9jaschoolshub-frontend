import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { SearchProgrammes, universityAPI } from '../services/universityApi';
import filterData from '../data/filterData';

const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [universityTypes, setUniversityTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract query from URL on mount
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }

    setUniversityTypes(filterData.universityType);
    setLocations(filterData.universityLocation);
  }, [searchParams]);

  // Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedType) params.set('type', selectedType);
    if (selectedLocation) params.set('location', selectedLocation);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, selectedType, selectedLocation, navigate]);

  // Fetch universities when any filter changes (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUniversities();
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedType, selectedLocation]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      setError('');
      let data;

      // If there's a search query, use API. Otherwise, get all unis.
      if (searchQuery) {
        const res = await SearchProgrammes(searchQuery);
        data = res.data || [];
      } else {
        // Optional: create an API method to get all universities
        // For now, assume SearchProgrammes with empty query returns all?
        // Or you can add a new API call like `getAllUniversities()`
        const res = await universityAPI.getAllUniversities // Modify backend to return all if empty
        data = res.data || [];
      }

      let filtered = data;

      if (selectedType) {
        filtered = filtered.filter((u) => u.type === selectedType);
      }
      if (selectedLocation) {
        filtered = filtered.filter((u) => u.location === selectedLocation);
      }

      setUniversities(filtered);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch universities.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const getResultText = () => {
    if (searchQuery) {
      return `Universities offering ${searchQuery}`;
    }
    return 'All Universities';
  };

  const getSubText = () => {
    if (searchQuery) {
      return `Showing results for "${searchQuery}"`;
    }
    return 'Browse all universities in the system';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Find Universities Offering Your Course
          </h1>

          {/* Search Input */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
              <input
                type="text"
                placeholder="Search for course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Search size={24} />
              </button>
            </form>

            {/* Filters */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="">Type</option>
                  {universityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>

              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="">Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getResultText()}</h2>
          <p className="text-gray-600">{getSubText()}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Searching universities...</p>
          </div>
        )}

        {/* Results */}
        {!loading && universities.length > 0 && (
          <div className="space-y-4">
            {universities.map((uni) => (
              <div
                key={uni._id}
                className="bg-white rounded-lg border border-gray-400 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/university/${uni._id}`)} // Redirect to UniversityDetails
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {uni.university_name}
                    </h3>
                    {/* <div className="flex items-center text-gray-600 mb-3 flex-wrap">
                      <div className="flex items-center mr-4 mb-1">
                        <MapPin size={16} className="mr-2" />
                        <span>{uni.location}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-sm mb-1 ${
                          uni.type === 'Federal'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {uni.type}
                      </span>
                    </div> */}

                    {/* <div className="mb-3">
                      <h4 className="font-medium text-gray-900 mb-1">requrements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {uni.notable_programs.flatMap((program) =>
                          program.Courses.map((courseObj) => (
                            <span
                              key={courseObj.course}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {courseObj.requirements}
                            </span>
                          ))
                        )}
                      </div>
                    </div> */}

                    {/* Contact Info */}
                    {/* <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {uni.email && (
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          <a href={`mailto:${uni.email}`} className="hover:text-blue-600">
                            {uni.email}
                          </a>
                        </div>
                      )}
                      {uni.phone && (
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          <a href={`tel:${uni.phone}`} className="hover:text-blue-600">
                            {uni.phone}
                          </a>
                        </div>
                      )}
                      {uni.website && (
                        <div className="flex items-center">
                          <ExternalLink size={14} className="mr-1" />
                          <a
                            href={`https://${uni.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div> */}
                  </div>
                  <ChevronDown
                    className="text-gray-400 ml-4"
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && universities.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;