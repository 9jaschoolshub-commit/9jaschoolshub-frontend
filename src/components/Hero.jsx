import heroImage1 from '../assets/images/top-image.jpg'
import heroImage2 from '../assets/images/bottom-image.jpg'
import Container from './Container'
import SearchBar from './SearchBar'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const handleSearch = (searchQuery) => {
    navigate(`/universities?search=${encodeURIComponent(searchQuery.trim())}`)
  }
  return (
    <Container className="bg-gray-100 py-10 sm:py-12">
      <section>
        <div className="grid grid-cols-2 gap-[5%] sm:gap-10 ">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl sm:max-w-full font-semibold text-gray-900 leading-tight h-max my-auto">
            Explore Verified Nigerian{' '}
            <span className="text-orange-400">Universities</span>
            <br />
            with Ease
          </h1>

          <div className="w-full max-h-64 xl:max-h-76 grid grid-cols-2">
            <figure className="w-full h-full">
              <img
                src={heroImage1}
                alt="Students studying"
                className="h-20 sm:h-30 xl:h-38 w-full overflow-hidden   bg-green-100 object-cover rounded-md"
              />
            </figure>

            <div />
            <div />
            <figure>
              <img
                src={heroImage2}
                alt="Students studying"
                className="h-20 sm:h-30 xl:h-38 w-full object-cover rounded-md ml-auto"
              />
            </figure>
          </div>
        </div>
        <div className="mt-1 space-y-4 sm:space-y-6 w-full">
          <p className="text-gray-600 text-sm sm:text-base text-start max-w-[75%] sm:max-w-sm ">
            Find up-to-date information on courses, admission requirements and
            more with ease - all in one
          </p>
          <SearchBar onSubmit={handleSearch} />
        </div>
      </section>
    </Container>
  )
}
export default Hero
