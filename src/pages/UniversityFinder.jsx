import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { universityAPI } from "../services/universityApi";
// import { useAllUniversities } from "../hooks/useQueries";

/**
 * Todo
 * Refactor component to use useAllUniversities for api operations
 */

import UniversityCardSkeleton from "../components/UniversityCardSkeleton";
import SearchBar from "../components/SearchBar";
import uniImage1 from "../assets/images/uni1.webp";
import uniImage2 from "../assets/images/uni2.jpg";
import uniImage3 from "../assets/images/uni3.jpg";
import uniImage4 from "../assets/images/uni4.jpg";
import uniImage5 from "../assets/images/uni5.jpg";

const UniversityFinder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allUniversities, setAllUniversities] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  // Extract ?search=query from URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchTerm = queryParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

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
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await universityAPI.getAllUniversities();
        setAllUniversities(response.data.doc);
        setError("");
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch universities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Memoize filtered universities for performance
  const filteredUniversities = useMemo(() => {
    let filtered = allUniversities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (university) =>
          university.university_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          university.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(
        (uni) => uni.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((uni) =>
        uni.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    return filtered;
  }, [allUniversities, searchTerm, selectedType, selectedLocation]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    // Clear filters when a search is performed
    setSelectedType("");
    setSelectedLocation("");
    // Update URL without reloading the page
    navigate(`/universities?search=${encodeURIComponent(query)}`, {
      replace: true,
    });
  };

  const handleFilterChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);

    // Clear search term when a filter is applied
    if (value) {
      setSearchTerm("");
      // Remove search query from URL
      navigate("/universities", { replace: true });
    }
  };

  const handleUniversityClick = (id) => {
    navigate(`/university/${id}`);
  };

  // Handler to load more universities
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  // Get unique types and locations for filters
  const uniqueTypes = useMemo(
    () => [...new Set(allUniversities.map((uni) => uni.type))],
    [allUniversities]
  );
  const uniqueLocations = useMemo(
    () => [...new Set(allUniversities.map((uni) => uni.location))],
    [allUniversities]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">
            find Nigerian universities with ease
          </h1>
          <p className="text-lg text-gray-600">
            Browse by name, state or type to find the universities that fits
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
          <SearchBar onSubmit={handleSearch} initialQuery={searchTerm} />
          {/* Filter Dropdowns */}
          <div className="flex w-full md:w-auto gap-4">
            <select
              value={selectedType}
              onChange={handleFilterChange(setSelectedType)}
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
              onChange={handleFilterChange(setSelectedLocation)}
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

      {/* Universities Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[...Array(9)].map((_, i) => (
                  <UniversityCardSkeleton key={i} />
                ))}
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
