import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAllUniversities } from '../hooks/useQueries'
import UniversityCardSkeleton from '../components/UniversityCardSkeleton'
import SearchBar from '../components/SearchBar'
import Carousel from '../components/Carousel'
import Container from '../components/Container'
import UniversityCard from '../components/UniversityCard'
import filterData from '../data/filterData'
import SelectFilterOption from '../components/SelectFilterOption'
import NoResultFound from '../components/NoResultFound'
import carouselData from '../data/carouselData'

const UniversityFinder = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [visibleCount, setVisibleCount] = useState(9)

  // Extract ?search=query from URL
  const queryParams = new URLSearchParams(location.search)
  const initialSearchTerm = queryParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const { data: universitiesResponse, isLoading } = useAllUniversities()
  const allUniversities = universitiesResponse?.data?.doc

  // Memoize filtered universities for performance
  const filteredUniversities = useMemo(() => {
    let filtered = allUniversities

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (university) =>
          university.university_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          university.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(
        (uni) => uni.type.toLowerCase() === selectedType.toLowerCase()
      )
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((uni) =>
        uni.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    return filtered
  }, [allUniversities, searchTerm, selectedType, selectedLocation])

  const handleSearch = (query) => {
    setSearchTerm(query)
    // Clear filters when a search is performed
    setSelectedType('')
    setSelectedLocation('')
    // Update URL without reloading the page
    navigate(`/courses?search=${encodeURIComponent(query)}`, {
      replace: true,
    })
  }

  const handleFilterChange = (setter, e) => {
    const value = e.target.value
    setter(value)

    // Clear search term when a filter is applied
    if (value) {
      setSearchTerm('')
      // Remove search query from URL
      navigate('/universities', { replace: true })
    }
  }

  // Handler to load more universities
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 9)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Container className="bg-white py-6 md:py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">
            find Nigerian universities with ease
          </h1>
          <p className="text-lg text-gray-600">
            Browse by name, state or type to find the universities that fits
            your goals
          </p>
        </div>
      </Container>

      {/* Image Carousel */}
      <Carousel carouselImages={carouselData.universities} />

      <Container className="bg-gray-50 py-10">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
          {/* Search Bar */}
          <SearchBar
            onSubmit={handleSearch}
            initialQuery={searchTerm}
            placeholder="Search University by name..."
          />

          {/* Filter Dropdowns */}
          <div className="flex w-full md:w-auto gap-4">
            <SelectFilterOption
              value={selectedType}
              onChange={handleFilterChange}
              setter={setSelectedType}
              label="Type"
              options={filterData.universityType}
            />

            <SelectFilterOption
              value={selectedLocation}
              onChange={handleFilterChange}
              setter={setSelectedLocation}
              label="Location"
              options={filterData.universityLocation}
            />
          </div>
        </div>
        {/* Universities Grid */}
        <div className="grid lg:grid-cols-3 gap-4 xl:gap-6">
          {isLoading
            ? [...Array(3)].map((_, i) => <UniversityCardSkeleton key={i} />)
            : filteredUniversities
                ?.slice(0, visibleCount)
                ?.map((university) => (
                  <UniversityCard key={university._id} {...university} />
                ))}
        </div>
        {!isLoading && filteredUniversities?.length === 0 && (
          <NoResultFound text="No universities found matching your criteria." />
        )}
        {filteredUniversities?.length > visibleCount && (
          <button
            className="mt-10 flex mx-auto px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600 transition cursor-pointer"
            onClick={handleViewMore}
          >
            View More
          </button>
        )}
      </Container>
    </div>
  )
}

export default UniversityFinder
