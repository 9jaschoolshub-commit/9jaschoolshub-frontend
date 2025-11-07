import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Search,
  Eye,
  Palette,
  Scale,
  ClipboardPlus,
  TestTube,
  Landmark,
  Monitor,
  Building2,
  Globe,
} from 'lucide-react'
import UniversityCardSkeleton from '../components/UniversityCardSkeleton'
import { useAllUniversities } from '../hooks/useQueries'
import Hero from '../components/Hero'
import EmpoweringSection from '../components/EmpoweringSection'
import AcademicDisciplineSection from '../components/AcademicDisciplineSection'
import FeaturedUniversitiesSection from '../components/FeaturedUniversitiesSection'

const ICONS = [
  <Palette className="w-5 h-5 text-blue-600" />,
  <Scale className="w-5 h-5 text-green-600" />,
  <ClipboardPlus className="w-5 h-5 text-purple-600" />,
  <TestTube className="w-5 h-5 text-yellow-600" />,
  <Landmark className="w-5 h-5 text-red-600" />,
  <Monitor className="w-5 h-5 text-blue-600" />,
  <Building2 className="w-5 h-5 text-indigo-600" />,
  <Globe className="w-5 h-5 text-teal-600" />,
]

const HomePage = () => {
  const navigate = useNavigate()

  const { data: universitiesResponse, isLoading } = useAllUniversities()

  const universities = useMemo(() => {
    return universitiesResponse?.data?.doc || []
  }, [universitiesResponse?.data?.doc])

  const disciplines = useMemo(() => {
    if (!universities || universities.length === 0) {
      return []
    }

    const getRandomColor = () => {
      const colors = [
        'bg-blue-50',
        'bg-green-50',
        'bg-purple-50',
        'bg-yellow-50',
        'bg-pink-50',
        'bg-indigo-50',
        'bg-red-50',
        'bg-teal-50',
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const facultyMap = {}
    universities.forEach((uni) => {
      uni.notable_programs.forEach((program) => {
        const faculty = program.Faculty
        if (!facultyMap[faculty]) {
          facultyMap[faculty] = {
            title: faculty,
            courses: [],
            color: getRandomColor(),
            icons: ICONS,
          }
        }
        // Add up to 5 unique courses
        program.Courses.forEach((courseObj) => {
          if (
            !facultyMap[faculty].courses.includes(courseObj.course) &&
            facultyMap[faculty].courses.length < 5
          ) {
            facultyMap[faculty].courses.push(courseObj.course)
          }
        })
      })
    })
    return Object.values(facultyMap)
  }, [universities])

  const handleSearchByFaculty = (facultyName) => {
    navigate(`/courses?search=${encodeURIComponent(facultyName)}`)
  }

  const truncateCourses = (courses, max = 3) => {
    if (courses.length <= max) return courses.join(', ')
    return `${courses.slice(0, max).join(', ')} +${courses.length - max} more`
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <AcademicDisciplineSection />

      {/* Featured Universities Section */}
      <FeaturedUniversitiesSection />
      {/* {isLoading ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <UniversityCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {universities.slice(0, 3).map((university, index) => (
                <div
                  key={university._id || index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition max-w-xl w-full mx-auto"
                >
                  <div className="h-48 bg-gray-200">
                    <img
                      src={university.image}
                      alt={university.university_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {university.university_name}
                      </h3>
                      {university.type && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            university.type === 'Private'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {university.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {university.location}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Programs</span>
                        <div className="font-semibold">
                          {university.notable_programs.length}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Tuition Fee</span>
                        <div className="font-semibold">
                          {university.school_fees_range || 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {university.notable_programs
                        .slice(0, 3)
                        .map((dept, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {dept.Faculty}
                          </span>
                        ))}
                      {university.notable_programs.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{university.notable_programs.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex flex-row-reverse justify-between gap-2">
                      <button
                        className="flex bg-orange-400 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
                        onClick={() =>
                          navigate(`/university/${university._id}`)
                        }
                      >
                        Apply Now
                      </button>
                      <button
                        className="flex justify-between items-center border border-orange-400 text-orange-400 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                        onClick={() =>
                          navigate(`/university/${university._id}`)
                        }
                      >
                        <Eye className="w-5 h-5 mr-1 text-orange-400" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                className="bg-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                onClick={() => navigate('/universities')}
              >
                View All Universities
              </button>
            </div>
          </div>
        </section>
      )} */}

      <EmpoweringSection />
    </div>
  )
}

export default HomePage
