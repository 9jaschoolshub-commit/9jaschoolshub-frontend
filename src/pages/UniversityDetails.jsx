import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // React Router for Vite
import { MapPin, Phone, Mail, ExternalLink, BookOpen, ChevronRight } from 'lucide-react';
import { universityAPI } from '../services/universityApi'; // adjust this path as needed

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // Number of programmes to show initially

  // Function to handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Increase the count by 4
  };

  useEffect(() => {
    if (!id) return;

    const fetchUniversity = async () => {
      try {
        setLoading(true);
        const res = await universityAPI.getUniversityById(id);
        setUniversity(res.data.university);
      } catch (err) {
        console.error('Failed to load university data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">University Not Found</h2>
          <p className="text-gray-500">Try again or check the ID in the URL.</p>
        </div>
      </div>
    );
  }

  const courses = university.notable_programs.flatMap(faculty =>
  faculty.Courses.map(course => course.course)
);

// console.log(courses); 

  return (
    <div className="min-h-screen p-6 mx-auto">
      {/* Basic Info */}
      <nav className='flex max-w-5xl items-center text-gray-600 text-sm mb-4 font-semibold'>
        <NavLink to='/universities' className=''>Home</NavLink>
        <span className='mx-2'><ChevronRight /></span>
        <p>Courses</p>
      </nav>
      
      {university && 
      <div className='flex flex-col gap-8'>
        <div className='bg-gray-100 px-20 flex flex-col sm:flex-row justify-center items-center gap-10 py-6 mx-auto w-full'>
          <div>
          <img className='' src={university.image} alt={university.university_name} />
          </div>
          <div className='flex flex-col items-start gap-1 text-sm sm:text-base'>
            <h1 className='text-lg sm:text-2xl font-semibold text-black'>{university.university_name}</h1>
            <p className='text-gray-600'>{university.location}</p>
            <p className='text-gray-600'>{university.type}</p>
            <p className='text-gray-600'>{university.school_fees_range}</p>
            <a 
            href={
              university.website.startsWith('https://')
              ? university.website
              : `https://${university.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className='my-1 text-white text-sm bg-[#F49E0B] px-3 py-2.5 rounded-md'
            >
              View Official Website
            </a>
          </div>
        </div>
        {/* Courses Offered */}
        <div className='p-10 bg-gray-100'>
          <div className='max-w-5xl mx-auto flex flex-col justify-center items-center gap-6'>
            <h2 className='text-2xl font-semibold text-black'>Courses Offered in {university.university_name}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
              {courses.map((course, index) => (
                <NavLink
                  to={`/courses?search=${encodeURIComponent(course)}`}
                  className="bg-blue-200 text-sm px-3 py-2 text-center rounded-md m-1 max-w-52 cursor-pointer hover:bg-blue-300 transition"
                >
                  {course}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      }
    </div>  
  );
};

export default UniversityDetails;
