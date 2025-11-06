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

      {/* Academic Disciplines Section */}
      <AcademicDisciplineSection />
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Search Universities by Your Preferred Course
            </h2>
            <p className="text-gray-600 text-lg">
              Discover Universities in Nigeria by your chosen course, location
              and type (Federal, State & Private)
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {disciplines.map((discipline, index) => (
              <div
                key={index}
                className="rounded-2xl hover:shadow-lg transition cursor-pointer shadow-md"
              >
                <div
                  className={`flex justify-center items-center w-full max-w-[315px] h-[173px] mx-auto ${discipline.color}`}
                >
                  <div className={`bg-amber-300/60 p-4 rounded-full`}>
                    {discipline.icons[index % discipline.icons.length]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {discipline.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {truncateCourses(discipline.courses, 3)}
                  </p>
                  <div
                    className="flex items-center text-gray-500 cursor-pointer"
                    onClick={() => handleSearchByFaculty(discipline.title)}
                  >
                    <Search className="w-4 mr-2" />
                    <span className="font-semibold text-sm hover:text-orange-400">
                      Search Courses
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="bg-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              onClick={() => navigate('/courses')}
            >
              View All Disciplines
            </button>
          </div>
        </div>
      </section> */}

      {/* Featured Universities Section */}
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

      {/* Empowering Section */}
      <EmpoweringSection />
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Empowering Your Academic Journey
              </h2>
              <p className="text-gray-600 mb-6">
                Our platform brings together reliable and updated information on
                universities, programs, and entry requirements to help students,
                parents and educators make informed decisions.
              </p>
              <p className="text-gray-600">
                Whether you are exploring your options or narrowing down your
                choices, everything you need is in one place.
              </p>
            </div>
            <div className="relative">
              <img
                src={academyJourney}
                alt="Students collaborating"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default HomePage
