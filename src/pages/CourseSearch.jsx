import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import UniversityCardSkeleton from '../components/UniversityCardSkeleton'
import filterData from '../data/filterData'
import Container from '../components/Container'
import SearchBar from '../components/SearchBar'
import SelectFilterOption from '../components/SelectFilterOption'
import { useSearchProgrammes } from '../hooks/useQueries'
import UniversityCard from '../components/UniversityCard'
import NoResultFound from '../components/NoResultFound'

const CourseSearch = () => {
  const queryParams = new URLSearchParams(location.search)
  /* An empty search query returns undefined */
  const initialSearchTerm = queryParams.get('search') || 'all'
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [visibleCount, setVisibleCount] = useState(9)
  const navigate = useNavigate()

  const { data: programmesResponse, isLoading } =
    useSearchProgrammes(searchTerm)
  const programmesResult = programmesResponse?.data?.doc
    
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

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 9)
  }

  const handleFilterChange = (setter, e) => {
    const value = e.target.value
    setter(value)

    // Clear search term when a filter is applied
    if (value) {
      setSearchTerm('')
      // Remove search query from URL
      navigate('/courses', { replace: true })
    }
  }

  const filteredUniversities = useMemo(() => {
    let filtered = programmesResult

    // Type filter
    if (selectedType) {
      filtered = filtered?.filter(
        (uni) => uni.type.toLowerCase() === selectedType.toLowerCase()
      )
    }
    // Location filter
    if (selectedLocation) {
      filtered = filtered?.filter((uni) =>
        uni.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }
    return filtered
  }, [programmesResult, searchTerm, selectedType, selectedLocation])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Container className="bg-white py-6 md:py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 capitalize">
            Find Universities Offering Your Course
          </h1>
          <p className="text-lg text-gray-600">
            Browse by course name, state or type to find the universities that
            fits your goals
          </p>
        </div>
      </Container>

      {/* Recommend a carousel here with images related to popular courses */}

      <Container className="bg-gray-50 py-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
          {/* Search Bar */}
          <SearchBar
            onSubmit={handleSearch}
            initialQuery={searchTerm}
            placeholder="Search University by course..."
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
        {searchTerm !== ' ' && (
          <h2 className="mb-10 text-xl lg:text-2xl font-medium">
            Showing results for universities offering{' '}
            <span className="">"{searchTerm}"</span>
          </h2>
        )}

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

export default CourseSearch
