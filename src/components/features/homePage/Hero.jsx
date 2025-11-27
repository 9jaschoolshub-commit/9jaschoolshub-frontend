import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import heroImage1 from "../../../assets/images/top-image.webp";
import heroImage2 from "../../../assets/images/bottom-image.webp";
import Container from "../../global/Container";
import SearchBar from "../../global/SearchBar";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleSearch = (searchQuery) => {
    navigate(`/universities?search=${encodeURIComponent(searchQuery.trim())}`);
  };
  return (
    <div className="relative bg-gray-50 min-h-[50vh] md:min-h-0">
      {/* Mobile-specific background image and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${heroImage1})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <Container className="py-16 sm:py-20 relative z-10">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content & Search */}
          <div className="space-y-6 text-center md:text-left relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white md:text-gray-900">
              Explore Verified Nigerian{" "}
              <span className="text-orange-500">Universities</span> With Ease
            </h1>
            <p className="text-base sm:text-lg max-w-md mx-auto md:mx-0 text-white md:text-gray-600">
              Find up-to-date information on courses, admission requirements,
              and more—all in one place.
            </p>
            <div className="max-w-md mx-auto md:mx-0">
              <SearchBar
                onSubmit={handleSearch}
                className="bg-white bg-opacity-90 rounded-lg"
                placeholder="Search University by name..."
              />
            </div>
          </div>

          {/* Right Column: Image Collage */}
          <div className="relative hidden md:grid grid-cols-2 gap-4 items-center">
            <div className="absolute bottom-0 left-0 w-70 h-30 xl:h-38 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
              <LazyLoadImage
                src={heroImage1}
                alt="Students studying"
                effect="blur"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </div>
            <div className="absolute top-0 right-0 w-70 h-30 xl:h-38 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
              <LazyLoadImage
                src={heroImage2}
                alt="University campus"
                effect="blur"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
export default Hero;
