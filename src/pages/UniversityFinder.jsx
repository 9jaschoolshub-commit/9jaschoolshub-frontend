import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { universityAPI } from "../services/universityApi";
import UniversityCardSkeleton from "../components/UniversityCardSkeleton";
import uniImage1 from "../assets/uni1.webp";
import uniImage2 from "../assets/uni2.jpg";
import uniImage3 from "../assets/uni3.jpg";
import uniImage4 from "../assets/uni4.jpg";
import uniImage5 from "../assets/uni5.jpg";

const UniversityFinder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [inputValue, setInputValue] = useState("");

  // Extract ?search=query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  // Sample university images for the carousel
  const universityImages = [
    uniImage1,
    uniImage2,
    uniImage3,
    uniImage4,
    uniImage5,
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full">
        <ul className="m-0 p-0 flex justify-center space-x-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="size-2 rounded-full bg-gray-300/50 transition-colors duration-300"></div>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  // Fetch universities on component mount
  useEffect(() => {
    const fetchHomeUniversities = async () => {
      if (!searchTerm) return;

      try {
        const data = await universityAPI.searchUniversities(searchTerm);
        setResult(data.doc);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await universityAPI.getAllUniversities();
        setUniversities(response.data.doc);
        setFilteredUniversities(response.data.doc);
        // console.log(response);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch universities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeUniversities, fetchUniversities();
  }, [searchTerm]);

  // Filter universities based on search and filters
  useEffect(() => {
    let filtered = universities;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (university) =>
          university.university_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          university.location
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          university.notable_programs.some((programme) =>
            programme.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(
        (university) =>
          university.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((university) =>
        university.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredUniversities(filtered);
  }, [universities, searchQuery, selectedType, selectedLocation]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    setSearchQuery(inputValue);
    if (!inputValue.trim()) return;

    try {
      setLoading(true);
      const response = await universityAPI.searchUniversities(inputValue);
      setFilteredUniversities(response.doc);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFromQuery = async (query) => {
    try {
      setLoading(true);
      const response = await universityAPI.searchUniversities(query);
      setFilteredUniversities(response.doc);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUniversityClick = (id) => {
    navigate(`/university/${id}`);
  };

  // Hnader to load more universities
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  // Get unique types and locations for filters
  const uniqueTypes = [...new Set(universities.map((uni) => uni.type))];
  const uniqueLocations = [...new Set(universities.map((uni) => uni.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">
            find Nigerian universities with ease
          </h1>
          <p className="text-lg text-gray-600">
            Browse by state, type or program to find the universities that fits
            your goals
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="h-90 relative w-full mb-10">
        <Slider {...sliderSettings} className="h-full w-full">
          {universityImages.map((image, index) => (
            <div key={index} className="h-90">
              <img
                src={image}
                alt={`University ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-auto md:flex-grow max-w-lg">
            <input
              type="text"
              placeholder="Search University by name..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full px-6 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent pr-12"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-orange-500 cursor-pointer"
            >
              <Search size={24} />
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex w-full md:w-auto gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-1/2 md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Type</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-1/2 md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Location</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {(inputValue || searchTerm) && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            Search Results for "{inputValue || searchTerm}"
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.map((uni) => (
              <div key={uni._id} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-bold">{uni.university_name}</h2>
                <p className="text-gray-600">{uni.location}</p>
                <a
                  href={`/university/${uni._id}`}
                  className="text-orange-500 text-sm mt-2 inline-block"
                >
                  View Details →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Universities Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[...Array(9)].map((_, i) => <UniversityCardSkeleton key={i} />)}
            </div>
          </div>
        </section>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No universities found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.slice(0, visibleCount).map((university) => (
              <div
                key={university._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-400 relative">
                  <img
                    src={university.image}
                    alt={university.university_name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    //  style={{
                    //   width: '100%',
                    //   height: '100%',
                    //   objectFit: 'cover',
                    //   display: 'block',
                    // }}
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {university.university_name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{university.location}</span>
                  </div>

                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        university.type === "Federal"
                          ? "bg-green-100 text-green-800"
                          : university.type === "State"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {university.type}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Popular Programs:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {university.notable_programs
                        .slice(0, 3)
                        .map((programme, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {programme.Faculty}
                          </span>
                        ))}
                      {university.notable_programs > 3 && (
                        <span className="text-xs text-gray-500">
                          +{university.notable_programs.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={
                        university.website.startsWith("https://")
                          ? university.website
                          : `https://${university.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Visit Website
                    </a>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => handleUniversityClick(university._id)}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredUniversities.length > visibleCount && (
        <button
          className="my-10 flex mx-auto px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600 transition cursor-pointer"
          onClick={handleViewMore}
        >
          View More
        </button>
      )}
    </div>
  );
};

export default UniversityFinder;
