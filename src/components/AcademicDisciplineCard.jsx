import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AcademicDisciplineCard = ({
  faculty,
  icon,
  iconBg,
  color,
  bg,
  courses,
}) => {
  const navigate = useNavigate()
  const IconComponent = icon
  const handleSearchByFaculty = (facultyName) => {
    navigate(`/courses?search=${encodeURIComponent(facultyName)}`)
  }
  return (
    <div className="rounded-lg hover:shadow-md transition shadow-sm flex flex-col text-gray-900">
      <div
        className={`flex justify-center items-center w-full h-36 ${bg} rounded-t-lg`}
      >
        <div className={`${iconBg} p-4 rounded-full`}>
          <IconComponent className={`w-5 h-5 text-${color}`} />
        </div>
      </div>
      <div className="px-2 py-4 flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <h3 className="text-lg font-medium capitalize">{faculty}</h3>
          <p className=" text-base capitalize">
            {courses.join(', ')}, <span className="lowercase"> and more</span>
          </p>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer mt-3"
          onClick={() => handleSearchByFaculty(faculty)}
        >
          <Search strokeWidth={2.5} className="w-3.5 h-3.5" />
          <span className="text-sm hover:text-orange-400">Search Courses</span>
        </div>
      </div>
    </div>
  )
}
export default AcademicDisciplineCard
