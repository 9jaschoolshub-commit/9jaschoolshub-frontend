import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = ({ carouselImages, slidesToShow, className}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: false,
    centerPadding: '0px',
    // autoplaySpeed: 3000,
    pauseOnHover: false,
    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full ">
        <span className="m-0 p-0 flex justify-center space-x-2 translate-y-2">
          {' '}
          {dots}{' '}
        </span>
      </div>
    ),
    customPaging: () => (
      <div className="size-2 rounded-full bg-gray-300/50 transition-colors duration-300"></div>
    ),
    dotsClass: 'slick-dots custom-dots',
  }
  return (
    <div className={`h-90 relative w-full mb-8 ${className}`}>
      <Slider {...sliderSettings} className="h-full w-full">
        {carouselImages.map((image, index) => (
          <figure className="overflow-hidden px-4">
            <img
              key={index}
              src={image}
              alt={`University ${index + 1}`}
              className="h-90 w-full object-cover rounded-md"
            />
          </figure>
        ))}
      </Slider>
    </div>
  )
}
export default Carousel
